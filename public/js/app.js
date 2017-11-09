(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.game = new Phaser.Game(1067, 600, Phaser.AUTO, 'gameDiv');

game.global = { score: 0 };

game.state.add('boot', require('./modules/states/boot'));
game.state.add('load', require('./modules/states/load'));
game.state.add('levelOne', require('./modules/states/levels/01'));
//game.state.add('end', require('./modules/states/end'));

game.state.start('boot');

},{"./modules/states/boot":3,"./modules/states/levels/01":4,"./modules/states/load":5}],2:[function(require,module,exports){
module.exports = function () {
  //images
  game.load.image('background', 'assets/images/paw_patrol_bg.png');
  game.load.image('platform', 'assets/images/platform.png');
  game.load.image('bone', 'assets/images/bone.png');

  //sprites
  game.load.spritesheet('dude', 'assets/images/rubble.png', 80.5, 71);

  //sounds
  game.load.audio('bgSound', 'assets/sounds/paw-patrol-theme-song.mp3');
};

},{}],3:[function(require,module,exports){
module.exports = {
  preload: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('progressBar', 'assets/images/progress_bar.png');
  },
  create: function () {
    game.state.start('load');
  }
};

},{}],4:[function(require,module,exports){
module.exports = {
  create: function () {
    game.add.sprite(0, 0, 'background');

    const music = game.add.audio('bgSound');
    music.loop = true;
    music.volume = 0.3;
    music.play();
  },
  update: function () {}
};

},{}],5:[function(require,module,exports){
const loadDefaultAssets = require('../loadDefaultAssets');

module.exports = {
  preload: function () {
    let textLoading = game.add.text(game.world.centerX, 250, 'LOADING...', { font: '70px grobold', fill: '#fff' });
    textLoading.anchor.set(0.5);

    let progressBar = game.add.sprite(game.world.centerX, 310, 'progressBar');
    progressBar.anchor.set(0.5);

    game.load.setPreloadSprite(progressBar);
    loadDefaultAssets();
  },
  create: function () {
    setTimeout(function () {
      game.state.start('levelOne');
    }, 1000);
  }
};

},{"../loadDefaultAssets":2}]},{},[1]);
