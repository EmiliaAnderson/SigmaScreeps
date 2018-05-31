var workerCounter = 1;

var roleWorker={
    run: function(creep, spawn, source){
        if(creep.carry.energy < creep.carryCapacity){
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if( creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(spawn);
            }
        }
    },

    createMinion: function(spawn){

        if (spawn.room.energyAvailable >= 200) {
            console.log('Trying to spawn worker!')
            if(spawn.spawnCreep([WORK,CARRY,MOVE], 'bob' + workerCounter, {memory:{role: 'worker'}}) == OK){
                workerCounter++;
            };
        }
        else {
            console.log("Not enough energy!");
        }
    }
};

module.exports = roleWorker;
