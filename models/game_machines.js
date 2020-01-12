const mysqlConnection = require("../connections");

async function getAllMachines() {
  const result = await mysqlConnection.query("SELECT m.id, m.name, serial_number, end_of_guarantee_date, game_type_id, t.name game_type_name from game_machines m LEFT OUTER JOIN game_types t ON m.game_type_id = t.id");
  console.log(result);
  return result;
}

async function addNewMachine(newMachineData){
  await mysqlConnection.query("INSERT INTO game_machines (name, serial_number, end_of_guarantee_date, game_type_id) VALUES (?, ?, ?, ?)", [newMachineData.name, newMachineData.serial_number, newMachineData.end_of_guarantee_date, newMachineData.game_type_id]);
}

async function deleteMachine(machineIdToDelete){
  await mysqlConnection.query("DELETE FROM game_machines WHERE id=?", [machineIdToDelete]);
}

exports.getAllMachines = getAllMachines;
exports.addNewMachine = addNewMachine;
exports.deleteMachine = deleteMachine;
