var bodyParser = require('body-parser');
const gameMachines = require('../models/game_machines.js');
const gameTypes = require('../models/game_types');

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/machine', async function(req, res){
    const machines = await gameMachines.getAllMachines();
    const types = await gameTypes.getAllTypes();
    res.render('machine', {
      machines: machines,
      types: types,
      machineURL: (id) => "/machine/" + id
    });
  });

  app.post('/machine', urlencodedParser, async function(req, res){
    await gameMachines.addNewMachine(req.body);
    res.redirect(303, '/machine');
  });

  app.delete('/machine/:id', async function(req, res){
    await gameMachines.deleteMachine(req.params.id);
    res.redirect(303, '/machine');
  });
}
