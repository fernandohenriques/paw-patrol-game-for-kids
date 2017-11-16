const checkEndGame = require('./checkEndGame');

//createTimer
module.exports = function(timer,level){
  let txtTimer = game.add.text(game.width - 10, 10, '00:' + timer,{font:'35px grobold',fill:'#fff'});
  txtTimer.anchor.set(1,0);

  const updateTime = () => {
    if(timer > 0) timer--;
    else if(timer == 0) checkEndGame(level.totalBonesCheck,level.nextLevel,1);
    txtTimer.text = '00:' + (timer<10?'0':'') + timer;
    if(game.global.timeLevel != -1) game.global.timeLeve = timer;
  };

  game.time.events.loop(1000,updateTime);
};
