const collectBones = require('./collectBones');

//updateCollisions
module.exports = function(bones, platforms, player, sounds, level, platformsMovable = false){
  const overlapPlayerBones = function(player, bone){
    collectBones(player,bone,level,sounds.getBoneSfx);
  };

  const collidePlayerPlatformMovable = function(player, platformMovel){
    if((platformMovel.y-70) > player.y) platformMovel.body.immovable = false;
  };

  game.physics.arcade.collide(bones, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, bones, overlapPlayerBones);

  if(platformsMovable) {
    game.physics.arcade.collide(player, platformsMovable, collidePlayerPlatformMovable);
  }
};
