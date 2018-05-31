var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');

var checkAndBuildRoad = function (creep) {
  const look = creep.room.lookAt(creep);
  var roadFound = false;
  look.forEach(function(lookObject) {
      if(lookObject.type == LOOK_STRUCTURES) {
          if (lookObject.structure.structureType == 'road') {
              roadFound = true;
          }
      }
  });

  if (!roadFound) {
      creep.pos.createConstructionSite(STRUCTURE_ROAD);
  }
}

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];
    console.log("Running loop");

    roleWorker.createMinion(spawn);
    roleUpgrader.createMinion(spawn);

    var sources = spawn.room.find(FIND_SOURCES);
    var mainSource = sources[0];

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'worker')
        {
            roleWorker.run(creep, spawn, mainSource);
        }
        else if (creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep, spawn, mainSource);
        }

        checkAndBuildRoad(creep);
    }
}

