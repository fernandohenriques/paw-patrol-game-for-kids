//updatePlayer
module.exports = function(player,cursors,spaceKey){
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
      player.body.velocity.x = -165;
      player.animations.play('left');
  } else if (cursors.right.isDown) {
      player.body.velocity.x = 165;
      player.animations.play('right');
  } else {
      player.animations.stop();
  }

  if ((cursors.up.isDown || spaceKey.isDown ) && player.body.touching.down) {
      player.body.velocity.y = -350;
  } else if (cursors.down.isDown && !player.body.touching.down) {
      player.body.velocity.y = 200;
  }
};
