var DataTypes = require("sequelize").DataTypes;
var _storages = require("./storages");

function initModels(sequelize) {
  var storages = _storages(sequelize, DataTypes);


  return {
    storages,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
