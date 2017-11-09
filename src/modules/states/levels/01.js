module.exports = {
  create: function() {
    game.add.sprite(0, 0, 'background');

    const music = game.add.audio('bgSound');
    music.loop = true;
    music.volume = 0.3;
    music.play();
  },
  update: function(){

  }
};
