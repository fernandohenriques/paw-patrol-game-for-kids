'use strict';

window.game = new Phaser.Game(1067,600,Phaser.AUTO,'gameDiv');

game.global = { music: {}, score: 0, totalCollectBones: 0 };

game.state.add('boot', require('./modules/states/boot'));
game.state.add('load', require('./modules/states/load'));
game.state.add('levelOne', require('./modules/states/levels/01'));
game.state.add('levelTwo', require('./modules/states/levels/02'));
game.state.add('end', require('./modules/states/end'));

game.state.start('boot');
