const mysqlConnection = require("../connections");

async function getAllTypes() {
  const result = await mysqlConnection.query("SELECT * from game_types");
  return result;
}

exports.getAllTypes = getAllTypes;
