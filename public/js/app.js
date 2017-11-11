(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.game = new Phaser.Game(1067, 600, Phaser.AUTO, 'gameDiv');

game.global = { score: 0 };

game.state.add('boot', require('./modules/states/boot'));
game.state.add('load', require('./modules/states/load'));
game.state.add('levelOne', require('./modules/states/levels/01'));
//game.state.add('end', require('./modules/states/end'));

game.state.start('boot');

},{"./modules/states/boot":8,"./modules/states/levels/01":9,"./modules/states/load":11}],2:[function(require,module,exports){
//collectBones
module.exports = function (player, bone, sfx = false) {
  if (sfx) sfx.play();
  bone.kill();

  /*score += 10;
  scoreText.text = 'Pontos: ' + score;*/
};

},{}],3:[function(require,module,exports){
//createBones
module.exports = function (quantity) {
  let bones = game.add.group();
  bones.enableBody = true;

  for (let i = 0; i < quantity; i++) {
    let bone;
    if (i == 0) bone = bones.create(10, 0, 'bone');else bone = bones.create(i * 68, 0, 'bone');

    bone.body.gravity.y = 200;
    bone.body.bounce.y = 0.5 + Math.random() * 0.2; //o quique do osso ao tocar o solo
  }

  return bones;
};

},{}],4:[function(require,module,exports){
//createPlatforms
module.exports = function (levelData, hasMovel = 0, posMovel = null) {
  let platforms = game.add.group();
  platforms.enableBody = true;

  for (let key in levelData) platforms.create(levelData[key].x, levelData[key].y, 'platform').body.immovable = true;

  //create Ground
  let ground = platforms.create(0, game.world.height - 57.6, 'platform');
  ground.scale.setTo(2.6675, 1.8);
  ground.body.immovable = true;

  return platforms;
};

},{}],5:[function(require,module,exports){
module.exports = function () {
  let player = game.add.sprite(32, game.world.height - 150, 'character');
  player.frame = 1;

  game.physics.arcade.enable(player);

  player.body.bounce.y = 0.1;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0], 10, true);
  player.animations.add('right', [1], 10, true);

  return player;
};

},{}],6:[function(require,module,exports){
module.exports = function () {
  game.add.sprite(0, 0, 'background');

  let music = game.add.audio('bgSound');
  music.loop = true;
  music.volume = 0.15;
  //music.play();

  let getBoneSfx = game.add.audio('getBone');
  let cursors = game.input.keyboard.createCursorKeys();
  let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  let sounds = { music: music, getBoneSfx: getBoneSfx };

  return { sounds: sounds, cursors: cursors, spaceKey: spaceKey };
};

},{}],7:[function(require,module,exports){
module.exports = function () {
  //images
  game.load.image('background', 'assets/images/paw_patrol_bg.png');
  game.load.image('platform', 'assets/images/platform.png');
  game.load.image('bone', 'assets/images/bone.png');

  //sprites
  game.load.spritesheet('character', 'assets/images/rubble.png', 80.5, 71);

  //sounds
  game.load.audio('bgSound', 'assets/sounds/paw-patrol-theme-song.mp3');
  game.load.audio('getBone', 'assets/sounds/get-item.ogg');
  game.load.audio('gameOver', 'assets/sounds/game-over.ogg');
};

},{}],8:[function(require,module,exports){
module.exports = {
  preload: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('progressBar', 'assets/images/progress_bar.png');
  },
  create: function () {
    game.state.start('load');
  }
};

},{}],9:[function(require,module,exports){
const levelData = require('./data/elements.json');
const defaultConfigLevels = require('../../defaultConfigLevels');
const createPlatforms = require('../../createPlatforms');
const createPlayer = require('../../createPlayer');
const createBones = require('../../createBones');
const updateCollisions = require('../../updateCollisions');
const updatePlayer = require('../../updatePlayer');

var sounds, cursors, spaceKey, platforms, player, bones;

function create() {
  config = defaultConfigLevels();
  platforms = createPlatforms(levelData.one.platforms);
  player = createPlayer();
  bones = createBones(16);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;
}

function update() {
  updateCollisions(bones, platforms, player, sounds);
  updatePlayer(player, cursors, spaceKey);
}

module.exports = { create: create, update: update };

},{"../../createBones":3,"../../createPlatforms":4,"../../createPlayer":5,"../../defaultConfigLevels":6,"../../updateCollisions":12,"../../updatePlayer":13,"./data/elements.json":10}],10:[function(require,module,exports){
module.exports={
  "one":{
    "platforms":[
      {"x":400,"y":400},
      {"x":-150,"y":250}
    ]
  },
  "two":{
    "platforms":[
      {"x":500,"y":600},
      {"x":100,"y":500}
    ]
  },
}

},{}],11:[function(require,module,exports){
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
    }, 500);
  }
};

},{"../loadDefaultAssets":7}],12:[function(require,module,exports){
const collectBones = require('./collectBones');

module.exports = function (bones, platforms, player, sounds) {
  const overlapPlayerBones = function (player, bones) {
    collectBones(player, bones, sounds.getBoneSfx);
  };

  game.physics.arcade.collide(bones, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, bones, overlapPlayerBones);
};

},{"./collectBones":2}],13:[function(require,module,exports){
module.exports = function (player, cursors, spaceKey) {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
    }

    if ((cursors.up.isDown || spaceKey.isDown) && player.body.touching.down) {
        player.body.velocity.y = -350;
    } else if (cursors.down.isDown && !player.body.touching.down) {
        player.body.velocity.y = 200;
    }
};

},{}]},{},[1]);