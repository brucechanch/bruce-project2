var DataTypes = require("sequelize").DataTypes;
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");
var _comment = require("./comment");
var _post = require("./post");

function initModels(sequelize) {
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);


  return {
    SequelizeMetum,
    User,
    comment,
    post,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
