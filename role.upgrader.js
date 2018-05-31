var upgraderCounter = 1;

var roleUpgrader={
    run: function(creep, spawn, source){
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 collect');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

        if(!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity){
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else if (creep.memory.upgrading){
            var controller = creep.room.controller;
            if( creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    },

    createMinion: function(spawn){

        if (spawn.room.energyAvailable >= 200) {
            console.log('Trying to spawn upgrader!')

            var spawnResult = spawn.spawnCreep([WORK,CARRY,MOVE], 'claire' + upgraderCounter, {memory:{role: 'upgrader'}});

            if(spawnResult == OK || spawnResult == ERR_NAME_EXISTS){
                upgraderCounter++;
            };
        }
        else {
            console.log("Not enough energy!");
        }
    }
};

module.exports = roleUpgrader;
