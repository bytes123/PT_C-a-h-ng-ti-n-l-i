const { db, sqlserverDB } = require("./../db");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const migrateHorizontal = async (tbName, query) => {
  const mysqlConfig = {
    host: "localhost",
    user: "root",
    database: "csdl_cuahangtienloi",
  };

  const sqlserverConfig = {
    host: "localhost",
    username: "sa",
    password: "123456",
    database: "csdl_cuahangtienloi",
    dialect: "mssql",
  };
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
  const [tb, columns] = await mysqlConnection.query(query);

  const attributes = {};
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

    attributes[column.name] = {
      type: dataType,
      allowNull: columnNullable,
      primaryKey: column.name === "id",
      autoIncrement: columnAI,
      default: columnDefault,
      unique: colUnique,
    };
  }
  const Object = sqlserverConnection.define(
    `csdl_cuahangtienloi.products`,
    attributes
  );
  await Object.sync({ force: false });
  await Object.bulkCreate(tb);
};

module.exports = { migrateHorizontal };
