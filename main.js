var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');
var roleMiner = require('role.miner');
var roleAttacker = require('role.attacker');
var roleBuilder = require('role.builder');

var addToSortedCreeps = function (creep, sortedCreeps) {
  if (!sortedCreeps[creep.memory.role]) {
      sortedCreeps[creep.memory.role] = [ creep ];
  } else {
      sortedCreeps[creep.memory.role].push(creep);
  }
}

var getAndLogCreepType = function (creepType, sortedCreeps) {
  var creeps = sortedCreeps[creepType] || [];
  console.log(creepType + ' : ' + creeps.length);
  return creeps;
}

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

var checkToBuildExtension = function(curPos) {
    var look = spawn.room.lookAt(curPos);
    var dontBuildHere = false;
    look.forEach(function(lookObject) {
        if (dontBuildHere)
        { 
            // do nothing     
        }
        else if(lookObject.type == LOOK_STRUCTURES) {
            if (lookObject.structure.structureType == 'extension') {
                dontBuildHere = true;
            }
        }
        else if(lookObject.type == LOOK_CONSTRUCTION_SITES) {
            if (lookObject.constructionSite.structureType == 'extension') {
                dontBuildHere = true;
            }
            else if (lookObject.constructionSite.structureType == 'road') {
                lookObject.constructionSite.remove();
            }
        }
    });

    if (!dontBuildHere)
    {
        var result = curPos.createConstructionSite(STRUCTURE_EXTENSION);
        if (result == ERR_RCL_NOT_ENOUGH)
        {
            return false;
        }
    }

    return true;
}

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];
    console.log("Running loop");
    var sortedCreeps = [];

    // Clear memory and sort creeps
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
          delete Memory.creeps[name];
          console.log('Clearing non-existing creep memory:', name);
      } else {
          addToSortedCreeps(Game.creeps[name], sortedCreeps);
      }
    }

    var miners = getAndLogCreepType('miner', sortedCreeps);
    var workers = getAndLogCreepType('worker', sortedCreeps);
    var upgraders = getAndLogCreepType('upgrader', sortedCreeps);
    var builders = getAndLogCreepType('builder', sortedCreeps);
    var attackers = getAndLogCreepType('attacker', sortedCreeps);

    if(workers.length < 3) {
      roleWorker.createMinion(spawn);
    } else if(miners.length < 1) {
      roleMiner.createMinion(spawn);
    } else if(upgraders.length < 1) {
      roleUpgrader.createMinion(spawn);
    } else if(builders.length < 1) {
      roleBuilder.createMinion(spawn);
    } else if(attackers.length < 1) {
      roleAttacker.createMinion(spawn);
    }

    //roleAttacker.createMinion(spawn);

    //Looks like we capture all sources, either dead or active.  Changing this *should*
    //cause the creeps to go to the next available one, but it's not the kind of spreading
    //of resources we want, right? 
    var sources = spawn.room.find(FIND_SOURCES);
    //I think that we are always sending everything to the first source with how we set mainSource
    var mainSource = sources[0];

    //Aaand this is my attempt to make a difference here, but I know it's either incomplete,
    //or invalid. See below

    //var sources = spawn.room.find(FIND_SOURCES_ACTIVE);
    //var mainSource;
    //if(sources.length > 1) {
    //for (var source in sources) {
    //    mainSource = sources[source];
    //}
    //else {
    //    mainSource = sources[0];
    //}
    //}

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
        else if (creep.memory.role == 'miner')
        {
            roleMiner.run(creep, spawn, mainSource);
        }
        else if (creep.memory.role == 'attacker')
        {
            roleAttacker.run(creep, spawn);
        }
        else if (creep.memory.role == 'builder')
        {
            roleBuilder.run(creep, spawn, mainSource);
        }

        checkAndBuildRoad(creep);

        
        if(spawn.room.controller.level > 1)
        {
            var spawnPos = spawn.pos;
            
            var stillPlacing = true;
            var offset = 1;
            while (stillPlacing)
            {
                // try x levels
                for (var yOffset = spawnPos.y - offset; yOffset < spawnPos.y; yOffset += 2 * offset) {
                    for (var xOffset = spawnPos.x - offset + 1; xOffset < spawnPos.x + offset - 1; xOffset += 2) {
                        if (!stillPlacing){
                            break;
                        }
                        var curPos = spawn.room.getPositionAt(spawnPos.x + xOffset, spawnPos.y + yOffset);
                        stillPlacing = checkToBuildExtension(curPos);
                    }
                }

                // try y levels
                for (var xOffset = spawnPos.x - offset; xOffset < spawnPos.x; xOffset += 2 * offset) {
                    for (var yOffset = spawnPos.y - offset + 1; yOffset < spawnPos.y + offset - 1; yOffset += 2) {
                        if (!stillPlacing){
                            break;
                        }
                        var curPos = spawn.room.getPositionAt(spawnPos.x + xOffset, spawnPos.y + yOffset);
                        stillPlacing = checkToBuildExtension(curPos);
                    }
                }
                offset++;
            }
            
            var curPos = spawn.room.getPositionAt(spawnPos.x-1, spawnPos.y);
            

        }
    }
}

