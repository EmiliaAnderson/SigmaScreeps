var builderCounter = 1;

var roleBuilder={
    run: function(creep, spawn, source){
      if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
        creep.say('🔄 harvest');
      }
      if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
          creep.memory.building = true;
          creep.say('🚧 build');
      }

      if(creep.memory.building) {
          var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo( 13, 8, {visualizePathStyle: {stroke: '#ffffff'}} );
            }
      }
      else {
          var containers = creep.room.find(FIND_STRUCTURES, { 
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER) 
                        && (structure.store[RESOURCE_ENERGY] > 0); 
                }
            });
            //var source = creep.pos.findClosestByPath(containers);
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
                creep.moveTo(source);
            }
      }
    },

    createMinion: function(spawn){

        if (spawn.room.energyAvailable >= 200) {
            console.log('Trying to spawn worker!')

            var spawnResult = spawn.spawnCreep([WORK,CARRY,MOVE], 'simon' + builderCounter, {memory:{role: 'builder'}});

            if(spawnResult == OK || spawnResult == ERR_NAME_EXISTS){
                builderCounter++;
            };
        }
        else {
            console.log("Not enough energy!");
        }
    }
};

module.exports = roleBuilder;
