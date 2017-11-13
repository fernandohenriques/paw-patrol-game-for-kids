//defaultConfigLevels
module.exports = function() {
  game.add.sprite(0, 0, 'background');

  let music = game.add.audio('bgSound');
  music.loop = true;
  music.volume = 0.15;
  //music.play();

  let getBoneSfx = game.add.audio('getBone');
  let cursors = game.input.keyboard.createCursorKeys();
  let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  let sounds = { music: music, getBoneSfx: getBoneSfx };

  return { sounds: sounds, cursors: cursors, spaceKey: spaceKey};
};
