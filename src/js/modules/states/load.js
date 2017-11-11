const loadDefaultAssets = require('../loadDefaultAssets');

module.exports = {
  preload: function() {
    let textLoading = game.add.text(game.world.centerX,250,'LOADING...',{font:'70px grobold',fill:'#fff'});
    textLoading.anchor.set(0.5);

    let progressBar = game.add.sprite(game.world.centerX,310,'progressBar');
    progressBar.anchor.set(0.5);

    game.load.setPreloadSprite(progressBar);
    loadDefaultAssets();
  },
  create: function() {
    setTimeout(function(){ game.state.start('levelOne'); },500);
  }
};
