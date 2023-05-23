"use strict";

const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const Category = require("../models/Category");
const Products = require("../models/Products");
const Brand = require("../models/Brand");

const migrateHorizontal = async (
  mysqlConnection,
  sqlserverConnection,
  tbName,
  query
) => {
  const [tb, columns] = await mysqlConnection.query(query);

  const attributes = {};

  const foreignKeys = await mysqlConnection.query(`
  SELECT COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
  FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = 'csdl_thucpham'
  AND TABLE_NAME = '${tbName}'
  AND REFERENCED_COLUMN_NAME IS NOT NULL;
  ;
`);

  if (tbName == "branches") {
    const dropConstraintQuery = (tbName) => {
      let sql = `DECLARE @sql NVARCHAR(MAX) = N'';

  SELECT @sql += 'ALTER TABLE ' + OBJECT_SCHEMA_NAME(parent_object_id) + '.' + OBJECT_NAME(parent_object_id)
    + ' DROP CONSTRAINT ' + name + ';
  '
  FROM sys.foreign_keys
  WHERE parent_object_id = OBJECT_ID('${tbName}');
  
  EXEC sp_executesql @sql;`;

      return sql;
    };

    await sqlserverConnection.query(dropConstraintQuery("products"));

    await sqlserverConnection.query(dropConstraintQuery("detail_products"));

    await sqlserverConnection.query(dropConstraintQuery("detail_storages"));

    await sqlserverConnection.query(dropConstraintQuery("storages"));
  }

  // Generate attributes for the model
  for (const column of columns) {
    const type = column.type;

    const [length] = await mysqlConnection.query(`
  SELECT CHARACTER_MAXIMUM_LENGTH
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = '${tbName}' AND COLUMN_NAME = '${column.name}'
`);
    const columnLength = length[0].CHARACTER_MAXIMUM_LENGTH;

    const [nullable] = await mysqlConnection.query(`
    SELECT IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${tbName}' AND COLUMN_NAME = '${column.name}'
  `);
    const columnNullable = nullable[0].IS_NULLABLE == "NO" ? false : true;

    const [colDefault] = await mysqlConnection.query(`
    SELECT COLUMN_DEFAULT
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${tbName}' AND COLUMN_NAME = '${column.name}'
  `);
    const columnDefault = colDefault[0].COLUMN_DEFAULT;

    const [extra] = await mysqlConnection.query(`
    SELECT EXTRA
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${tbName}' AND COLUMN_NAME = '${column.name}'
  `);
    const columnAI = extra[0].EXTRA == "auto_increment" ? true : false;

    const [colKey] = await mysqlConnection.query(`
    SELECT COLUMN_KEY
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${tbName}' AND COLUMN_NAME = '${column.name}'
  `);
    const colUnique = colKey[0].COLUMN_KEY == "UNI" ? true : false;

    let dataType;
    if (type == 3) {
      dataType = Sequelize.INTEGER;
    } else if (type == 253) {
      dataType = Sequelize.STRING(columnLength);
    } else if (type == 252) {
      dataType = Sequelize.TEXT;
    } else if (type == 12) {
      dataType = Sequelize.DATE;
    } else {
      dataType = Sequelize.STRING(columnLength);
    }

    const foreignKey = foreignKeys[0].find(
      (key) => key.COLUMN_NAME === column.name
    );

    if (foreignKey) {
      attributes[column.name] = {
        type: dataType,
        references: {
          model: foreignKey.REFERENCED_TABLE_NAME,
          key: foreignKey.REFERENCED_COLUMN_NAME,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: columnNullable,
        timestamps: false,
        default: columnDefault,
        unique: colUnique,
      };
    } else {
      attributes[column.name] = {
        type: dataType,
        allowNull: columnNullable,
        primaryKey: column.name === "id",
        autoIncrement: columnAI,
        default: columnDefault,
        unique: colUnique,
      };
    }
  }

  const Object = sqlserverConnection.define(`${tbName}`, attributes);
  await Object.sync({ force: true });
  await Object.bulkCreate(tb);

  // } else {
  //   for (const data of tb) {
  //     await TABLE.findOrCreate({ where: { id: data.id }, defaults: data });
  //   }
  // }
};

module.exports = {
  loginDB: async (req, res) => {
    const { host, user, password, database } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: host,
        user: user,
        password: password,
      });

      const [rows, fields] = await connection.execute("SHOW DATABASES");
      const databases = rows.map((row) => row.Database);

      res.status(200).json(databases);
    } catch (error) {
      res.sendStatus(400);
    }
  },
  getTable: async (req, res) => {
    const { database, user } = req.body;

    try {
      const connection = await mysql.createConnection(user);

      const [rows, fields] = await connection.execute(
        `SHOW TABLES FROM ${database}`
      );
      const tables = rows.map((table) => Object.values(table)[0]);
      res.status(200).json(tables);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },
  getColumn: async (req, res) => {
    const { user, database, table } = req.body;

    user.database = database;

    try {
      const connection = await mysql.createConnection(user);

      const [rows] = await connection.execute(`SHOW COLUMNS FROM ${table}`);

      const columns = rows.map((row) => row.Field);
      columns.map((column) => {
        return {
          label: column,
          value: column,
        };
      });
      res.status(200).json(columns);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  },
  migrate: async (req, res) => {
    const { storage_id, branch_id } = req.body;

    const mysqlConfig = {
      host: "localhost",
      user: "root",
      database: "csdl_thucpham",
    };

    const sqlserverConfig = {
      host: "localhost",
      username: "sa",
      password: "123456",
      database: "TEST",
      dialect: "mssql",
    };

    if (branch_id == 2) {
      try {
        const mysqlConnection = await mysql.createConnection(mysqlConfig);
        const sqlserverConnection = new Sequelize(
          sqlserverConfig.database,
          sqlserverConfig.username,
          sqlserverConfig.password,
          {
            host: sqlserverConfig.host,
            dialect: sqlserverConfig.dialect,
          }
        );

        const branchesQuery = "SELECT * FROM branches";
        const storagesQuery = `SELECT * FROM storages `;
        const detailStoragesQuery = `SELECT * FROM detail_storages WHERE storage_id = ${storage_id}`;
        const categoriesQuery = `SELECT * FROM categories WHERE id IN (SELECT p.category_id FROM products p INNER JOIN detail_products dp ON dp.product_id = p.id INNER JOIN detail_storages ds ON ds.detail_product_id = dp.id INNER JOIN storages s ON ds.storage_id = s.id AND s.id= ${storage_id})`;
        const brandsQuery = `SELECT * FROM brands WHERE id IN (SELECT p.brand_id FROM products p INNER JOIN detail_products dp ON dp.product_id = p.id INNER JOIN detail_storages ds ON ds.detail_product_id = dp.id INNER JOIN storages s ON ds.storage_id = s.id AND s.id= ${storage_id})`;

        const productsQuery = `SELECT * FROM products WHERE id IN (SELECT dp.product_id FROM detail_products dp INNER JOIN detail_storages ds ON ds.detail_product_id = dp.id INNER JOIN storages s ON ds.storage_id = s.id AND s.id= ${storage_id}) `;
        const detailProductsQuery = `SELECT * FROM detail_products WHERE id in (SELECT detail_product_id from detail_storages WHERE storage_id = ${storage_id})`;

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "branches",
          branchesQuery
        );

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "storages",
          storagesQuery
        );

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "categories",
          categoriesQuery
        );

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "brands",
          brandsQuery
        );

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "products",
          productsQuery
        );

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "detail_products",
          detailProductsQuery
        );

        await migrateHorizontal(
          mysqlConnection,
          sqlserverConnection,
          "detail_storages",
          detailStoragesQuery
        );

        // const [categoriesTable] = await mysqlConnection.query(categoriesQuery);
        // const categoriesAttr = Category.Categories();
        // const Categories = await sqlserverConnection.define(
        //   "categories",
        //   categoriesAttr
        // );
        // const [brandsTable] = await mysqlConnection.query(brandsQuery);
        // const brandsAttr = Brand.Brands();
        // const Brands = await sqlserverConnection.define("brands", brandsAttr);

        // const [productsTable] = await mysqlConnection.query(productsQuery);
        // const productsAttr = Products.Products();
        // const Product = await sqlserverConnection.define(
        //   "products",
        //   productsAttr
        // );

        // Categories.hasMany(Product, {
        //   foreignKey: "category_id",
        //   foreignKeyConstraint: true,
        //   onDelete: "CASCADE",
        //   onUpdate: "CASCADE",
        // });

        // Brands.hasMany(Product, {
        //   foreignKey: "brand_id",
        //   foreignKeyConstraint: true,
        //   onDelete: "CASCADE",
        //   onUpdate: "CASCADE",
        // });

        // await Categories.bulkCreate(categoriesTable);
        // await Brands.bulkCreate(brandsTable);
        // await Product.bulkCreate(productsTable);

        res.send("Migration complete!");
      } catch (err) {
        console.error(err);
        res.status(500).send("Migration failed.");
      }
    } else {
      res.status(500).send("Chi nhánh chưa được khởi tạo");
    }
  },
};
