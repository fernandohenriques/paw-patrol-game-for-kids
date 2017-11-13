const checkEndGame = require('./checkEndGame');

//collectBones
module.exports = function(player, bone, level, sfx = false){
  if(sfx) sfx.play();
  bone.kill();
  game.global.totalCollectBones++;
  checkEndGame(level.totalBonesCheck,level.nextLevel);
  /*score += 10;
  scoreText.text = 'Pontos: ' + score;*/
};
