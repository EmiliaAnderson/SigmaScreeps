var upgraderCounter = 1;

var roleUpgrader={
    run: function(creep, spawn, source){
        if(creep.carry.energy < creep.carryCapacity){
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var controller = creep.room.controller;
            if( creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    },

    createMinion: function(spawn){

        if (spawn.room.energyAvailable >= 200) {
            console.log('Trying to spawn upgrader!')
            if(spawn.spawnCreep([WORK,CARRY,MOVE], 'claire' + upgraderCounter, {memory:{role: 'upgrader'}}) == OK){
                upgraderCounter++;
            };
        }
        else {
            console.log("Not enough energy!");
        }
    }
};

module.exports = roleUpgrader;
