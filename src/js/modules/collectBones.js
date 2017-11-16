const checkEndGame = require('./checkEndGame');

//collectBones
module.exports = function(player, bone, level, sfx = false){
  if(sfx) sfx.play();
  bone.kill();
  game.global.collectedBones++;
  checkEndGame(level.totalBonesCheck,level.nextLevel);
};
