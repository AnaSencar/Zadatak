const mysqlConnection = require("../connections");
const validator = require('validator');

async function getAllMachines() {
  const result = await mysqlConnection.query("SELECT m.id, m.name, serial_number, end_of_guarantee_date, game_type_id, t.name game_type_name from game_machines m LEFT OUTER JOIN game_types t ON m.game_type_id = t.id");
  return result;
}

async function addNewMachine(newMachineData){
  var validationState = validateData(newMachineData);
  if(!validationState.isError){
    try {
      await mysqlConnection.query(
        "INSERT INTO game_machines (name, serial_number, end_of_guarantee_date, game_type_id) VALUES (?, ?, ?, ?)",
        [newMachineData.name, newMachineData.serial_number, newMachineData.end_of_guarantee_date, newMachineData.game_type_id]
      );
    }
    catch(mysqlError){
      console.error({mysqlError, newMachineData});
      validationState.errorMsgs.database = "Database exception";
      validationState.isError = true;
    }
  }
  return validationState;
}

async function deleteMachine(machineIdToDelete){
  await mysqlConnection.query("DELETE FROM game_machines WHERE id=?", [machineIdToDelete]);
}

function validateData(machineData){
  var validationState = noValidationState();
  if(validator.isEmpty(machineData.name) || !validator.isAlphanumeric(machineData.name)){
    validationState.errorMsgs.name = "Name must be non empty and alphanumeric";
    validationState.isError=true;
  }
  if(!validator.isInt(machineData.serial_number)){
    validationState.errorMsgs.serial_number = "Serial number must be integer";
    validationState.isError=true;
  }
  const date = validator.toDate(machineData.end_of_guarantee_date);
  if(!date || date < new Date()){
    validationState.errorMsgs.end_of_guarantee_date = "Date needs to be after today";
    validationState.isError=true;
  }
  validationState.oldInputs = machineData;
  return validationState;
}

function noValidationState(){
  return {
    isError: false,
    errorMsgs: {name: null, serial_number: null, end_of_guarantee_date: null, game_type_id: null, database: null},
    oldInputs: {name: null, serial_number: null, end_of_guarantee_date: null, game_type_id: null}
  };
}

exports.getAllMachines = getAllMachines;
exports.addNewMachine = addNewMachine;
exports.deleteMachine = deleteMachine;
exports.validateData = validateData;
exports.noValidationState = noValidationState;
