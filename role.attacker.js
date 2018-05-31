var attackerCounter = 1;

var roleAttacker={
    run: function(creep, spawn){
        var enemies= creep.room.find(Game.HOSTILE_CREEPS);

        if(enemies.length > 0)
        {
            creep.moveTo(enemies[0]);
            creep.attack(enemies[0]);
        }
        else{
            creep.moveTo(creep.room.controller);
        }
    },

    createMinion: function(spawn){

        if (spawn.room.energyAvailable >= 140) {
            console.log('Trying to spawn attacker!')

            var spawnResult = spawn.spawnCreep([TOUGH, MOVE, ATTACK], 'paul' + attackerCounter, {memory:{role: 'attacker'}});

            if(spawnResult == OK || spawnResult == ERR_NAME_EXISTS){
                attackerCounter++;
            };
        }
        else {
            console.log("Not enough energy!");
        }
    }
};

module.exports = roleAttacker;
