var minerCounter = 1;

var roleMiner={
    run: function(creep, spawn, source){
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    },

    createMinion: function(spawn){

        if (spawn.room.energyAvailable >= 250) {
            console.log('Trying to spawn miner!')
            if(spawn.spawnCreep([WORK, WORK, MOVE], 'minerJoe' + minerCounter, {memory:{role: 'miner'}}) == OK){
                minerCounter++;
            };
        }
        else {
            console.log("Not enough energy!");
        }
    }
};

module.exports = roleMiner;
