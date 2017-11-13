//createPlatforms
module.exports = function(levelData, hasMovel = 0, posMovel = null){
  let platforms = game.add.group();
  platforms.enableBody = true;

  for(let key in levelData) {
    let platform = platforms.create(levelData[key].x, levelData[key].y, 'platform');
    platform.body.immovable = true;
    if("scale" in levelData[key])
      platform.scale.setTo(levelData[key].scale[0],levelData[key].scale[1]);
  }

   //create Ground
  let ground = platforms.create(0, game.world.height - 57.6, 'platform');
  ground.scale.setTo(2.6675, 1.8);
  ground.body.immovable = true;

  return platforms;
};
