module.exports = {
  preload: function() {
    let textGameOver = game.add.text(game.world.centerX,280,'GAME OVER',{font:'70px grobold',fill:'#fff'});
    textGameOver.anchor.set(0.5);
  },
  create: function(){
    let soundGameOver = game.add.audio('gameOver');
    soundGameOver.play();

    let txtPressEnter = game.add.text(game.world.centerX,555,'PRESS ENTER TO RESTART',{font:'15px emulogic', fill: '#fff'});
    txtPressEnter.anchor.set(0.5);
    game.add.tween(txtPressEnter).to({y: 355},1000).start();

    const txtBlink = () => game.add.tween(txtPressEnter).to({alpha: 1},700).to({alpha: 0},700).loop().start();
    game.time.events.add(1000,txtBlink);
  },
  update: function(){
    const enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if(enterKey.isDown) {
      game.global.totalCollectBones = 0;
      game.state.start('levelOne'); //for now, later wil go to menu
    }
  }
};
