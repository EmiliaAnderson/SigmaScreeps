module.exports.loop = function () {
  var spawn = Game.spawns['Spawn1'];
  console.log("Running loop");

  if (spawn.room.energyAvailable >= 200) {
    console.log('Trying to spawn!')
      spawn.spawnCreep([WORK,CARRY,MOVE], 'bob3', {memory:{role: 'worker'}});
  }
  else {
      console.log("Not enough energy!");
  }

  for(var name in Game.creeps) {
      var creep = Game.creeps[name];

      if(creep.carry.energy < creep.carryCapacity){
          var sources = creep.room.find(FIND_SOURCES);
      
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
          }
      }
      else {
          if( creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
              creep.moveTo(spawn);
          }
      }
  }

}

