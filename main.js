var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];
    console.log("Running loop");

    roleWorker.createMinion(spawn);
    roleUpgrader.createMinion(spawn);

    var sources = spawn.room.find(FIND_SOURCES);
    var mainSource = sources[0];

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
    }
}

