//createPlatforms
module.exports = function(levelData, hasMovel = 0, posMovel = null){
  let platforms = game.add.group();
  platforms.enableBody = true;

  for(let key in levelData)
      platforms.create(levelData[key].x, levelData[key].y, 'platform').body.immovable = true;

   //create Ground
  let ground = platforms.create(0, game.world.height - 57.6, 'platform');
  ground.scale.setTo(2.6675, 1.8);
  ground.body.immovable = true;

  return platforms;
};
