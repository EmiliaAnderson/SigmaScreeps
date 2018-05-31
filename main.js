module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];

    if (spawn.room.energyAvailable >= 200) {
        spawn.spawnCreep([WORK,CARRY,MOVE], undefined, {role: 'worker'});
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

