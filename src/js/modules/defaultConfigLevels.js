//defaultConfigLevels
module.exports = function() {
  game.add.sprite(0, 0, 'background');

  let getBoneSfx = game.add.audio('getBone');
  let cursors = game.input.keyboard.createCursorKeys();
  let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  let sounds = { getBoneSfx: getBoneSfx };

  return { sounds: sounds, cursors: cursors, spaceKey: spaceKey};
};
