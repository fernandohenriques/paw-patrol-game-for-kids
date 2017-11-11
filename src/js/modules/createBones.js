//createBones
module.exports = function(quantity) {
  let bones = game.add.group();
  bones.enableBody = true;

  for (let i = 0; i < quantity; i++)
  {
      let bone;
      if(i == 0) bone = bones.create(10, 0, 'bone');
      else bone = bones.create(i * 68, 0, 'bone');

      bone.body.gravity.y = 200;
      bone.body.bounce.y = 0.5 + Math.random() * 0.2; //o quique do osso ao tocar o solo
  }

  return bones;

};
