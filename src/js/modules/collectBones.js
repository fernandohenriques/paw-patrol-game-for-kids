//collectBones
module.exports = function(player, bone, sfx = false){
  if(sfx) sfx.play();
  bone.kill();

  /*score += 10;
  scoreText.text = 'Pontos: ' + score;*/
};
