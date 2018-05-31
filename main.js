var roleWorker = require('role.worker');

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];
    console.log("Running loop");

    if (spawn.room.energyAvailable >= 200) {
    console.log('Trying to spawn!')
        spawn.spawnCreep([WORK,CARRY,MOVE], 'bob4', {memory:{role: 'worker'}});
    }
    else {
        console.log("Not enough energy!");
    }

    var sources = spawn.room.find(FIND_SOURCES);
    var mainSource = sources[0];

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleWorker.run(creep, spawn, mainSource);        
    }
}

