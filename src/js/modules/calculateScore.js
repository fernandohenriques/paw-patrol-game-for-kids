//calculateScore
module.exports = function(isGameOver){
    let score = (game.global.timeLevel+1)*game.global.collectedBones;
    game.global.score += score;
    game.global.timeLevel = 0;
    game.global.collectedBones = 0;
    if(isGameOver) game.global.timeLevel = -1;
};
