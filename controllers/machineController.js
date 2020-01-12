var bodyParser = require('body-parser');
const gameMachines = require('../models/game_machines.js');
const gameTypes = require('../models/game_types');

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/machine', async function(req, res){
    const {isError, errorMsgs, oldInputs} = gameMachines.noValidationState();
    res.render('machine', {
      machineData: {
        machines: await gameMachines.getAllMachines(),
        machineURL: (id) => "/machine/" + id
      },
      formData: {
        isError,
        errorMsgs,
        oldInputs,
        types: await gameTypes.getAllTypes()
      }
    });
  });

  app.post('/machine', urlencodedParser, async function(req, res){
    const {isError, errorMsgs, oldInputs} = await gameMachines.addNewMachine(req.body);
    if(!isError){
      res.redirect(303, '/machine');
    }
    else {
      //res.status(400);
      res.render('machine', {
        machineData: {
          machines: await gameMachines.getAllMachines(),
          machineURL: (id) => "/machine/" + id
        },
        formData: {
          isError,
          errorMsgs,
          oldInputs,
          types: await gameTypes.getAllTypes()
        }
      });
    }
  });

  app.delete('/machine/:id', async function(req, res){
    await gameMachines.deleteMachine(req.params.id);
    res.redirect(303, '/machine');
  });
}
