const collectBones = require('./collectBones');

module.exports = function(bones, platforms, player, sounds){
  const overlapPlayerBones = function(player,bones){
    collectBones(player,bones,sounds.getBoneSfx);
  };

  game.physics.arcade.collide(bones, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, bones, overlapPlayerBones);
};
