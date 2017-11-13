module.exports = {
  preload: function() {
    let textGameOver = game.add.text(game.world.centerX,280,'GAME OVER',{font:'70px grobold',fill:'#fff'});
    textGameOver.anchor.set(0.5);
  }
};
