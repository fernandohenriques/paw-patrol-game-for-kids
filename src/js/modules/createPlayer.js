module.exports = function() {
  let player = game.add.sprite(32, game.world.height - 150, 'character');
  player.frame = 1;
  
  game.physics.arcade.enable(player);

  player.body.bounce.y = 0.1;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0], 10, true);
  player.animations.add('right', [1], 10, true);

  return player;
};
