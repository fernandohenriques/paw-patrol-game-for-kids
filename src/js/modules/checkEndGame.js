//checkEndGame
module.exports = function(quantityCheck, nextLevel, timeClosed = false){
  let nextState = false;
  if(game.global.totalCollectBones == quantityCheck) nextState = nextLevel;
  else if(timeClosed) nextState = 'end';

  if(nextState) {
    const go = () => game.state.start(nextState);
    game.camera.fade('#000',800);
    game.camera.onFadeComplete.add(go);
  }
};
