const collectBones = require('./collectBones');

//updateCollisions
module.exports = function(bones, platforms, player, sounds, level){
  const overlapPlayerBones = function(player,bone){
    collectBones(player,bone,level,sounds.getBoneSfx);
  };

  game.physics.arcade.collide(bones, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, bones, overlapPlayerBones);
};
