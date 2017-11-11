module.exports = {
  preload: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('progressBar','assets/images/progress_bar.png');
  },
  create: function() {
    game.state.start('load');
  }
};
