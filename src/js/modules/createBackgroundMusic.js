module.exports = function() {
  let music = game.add.audio('bgSound');
  music.loop = true;
  music.volume = 0.1;

  return music;
};
