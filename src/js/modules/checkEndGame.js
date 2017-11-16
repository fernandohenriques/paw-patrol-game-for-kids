const calculateScore = require('./calculateScore');

//checkEndGame
module.exports = function(quantityCheck, nextLevel, timeClosed = false){
  let nextState = false;
  if(game.global.collectedBones == quantityCheck) nextState = nextLevel;
  else if(timeClosed) nextState = 'end';

  if(nextState) {
    calculateScore(timeClosed);
    const go = () => game.state.start(nextState);
    game.camera.fade('#000',800);
    game.camera.onFadeComplete.add(go);
  }
};
