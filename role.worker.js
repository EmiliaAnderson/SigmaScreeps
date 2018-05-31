var roleWorker={
    run: function(spawn, source){
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
    }
};

module.exports = roleWorker;
