(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.game = new Phaser.Game(1067, 600, Phaser.AUTO, 'gameDiv');

game.global = { music: {}, score: 0, totalCollectBones: 0 };

game.state.add('boot', require('./modules/states/boot'));
game.state.add('load', require('./modules/states/load'));
game.state.add('levelOne', require('./modules/states/levels/01'));
game.state.add('levelTwo', require('./modules/states/levels/02'));
game.state.add('end', require('./modules/states/end'));

game.state.start('boot');

},{"./modules/states/boot":11,"./modules/states/end":12,"./modules/states/levels/01":13,"./modules/states/levels/02":14,"./modules/states/load":16}],2:[function(require,module,exports){
//checkEndGame
module.exports = function (quantityCheck, nextLevel, timeClosed = false) {
  let nextState = false;
  if (game.global.totalCollectBones == quantityCheck) nextState = nextLevel;else if (timeClosed) nextState = 'end';

  if (nextState) {
    const go = () => game.state.start(nextState);
    game.camera.fade('#000', 800);
    game.camera.onFadeComplete.add(go);
  }
};

},{}],3:[function(require,module,exports){
const checkEndGame = require('./checkEndGame');

//collectBones
module.exports = function (player, bone, level, sfx = false) {
  if (sfx) sfx.play();
  bone.kill();
  game.global.totalCollectBones++;
  checkEndGame(level.totalBonesCheck, level.nextLevel);
};

},{"./checkEndGame":2}],4:[function(require,module,exports){
module.exports = function () {
  let music = game.add.audio('bgSound');
  music.loop = true;
  music.volume = 0.1;

  return music;
};

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
//createPlatforms
module.exports = function (levelData, hasMovel = 0, posMovel = null) {
  let platforms = game.add.group();
  platforms.enableBody = true;

  for (let key in levelData) {
    let platform = platforms.create(levelData[key].x, levelData[key].y, 'platform');
    platform.body.immovable = true;
    if ("scale" in levelData[key]) platform.scale.setTo(levelData[key].scale[0], levelData[key].scale[1]);
  }

  //create Ground
  let ground = platforms.create(0, game.world.height - 57.6, 'platform');
  ground.scale.setTo(2.6675, 1.8);
  ground.body.immovable = true;

  return platforms;
};

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
const checkEndGame = require('./checkEndGame');

//createTimer
module.exports = function (timer, level) {
  let txtTimer = game.add.text(game.width - 10, 10, '00:' + timer, { font: '35px grobold', fill: '#fff' });
  txtTimer.anchor.set(1, 0);

  const updateTime = () => {
    if (timer > 0) timer--;else if (timer == 0) checkEndGame(level.totalBonesCheck, level.nextLevel, 1);
    txtTimer.text = '00:' + (timer < 10 ? '0' : '') + timer;
  };

  return game.time.events.loop(1000, updateTime);
};

},{"./checkEndGame":2}],9:[function(require,module,exports){
//defaultConfigLevels
module.exports = function () {
  game.add.sprite(0, 0, 'background');

  let getBoneSfx = game.add.audio('getBone');
  let cursors = game.input.keyboard.createCursorKeys();
  let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  let sounds = { getBoneSfx: getBoneSfx };

  return { sounds: sounds, cursors: cursors, spaceKey: spaceKey };
};

},{}],10:[function(require,module,exports){
//loadDefaultAssets
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

},{}],11:[function(require,module,exports){
module.exports = {
  preload: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('progressBar', 'assets/images/progress_bar.png');
  },
  create: function () {
    game.state.start('load');
  }
};

},{}],12:[function(require,module,exports){
module.exports = {
  preload: function () {
    game.global.music.stop();
    let textGameOver = game.add.text(game.world.centerX, 280, 'GAME OVER', { font: '70px grobold', fill: '#fff' });
    textGameOver.anchor.set(0.5);
  },
  create: function () {
    let soundGameOver = game.add.audio('gameOver');
    soundGameOver.play();

    let txtPressEnter = game.add.text(game.world.centerX, 555, 'PRESS ENTER TO RESTART', { font: '15px emulogic', fill: '#fff' });
    txtPressEnter.anchor.set(0.5);
    game.add.tween(txtPressEnter).to({ y: 355 }, 1000).start();

    const txtBlink = () => game.add.tween(txtPressEnter).to({ alpha: 1 }, 700).to({ alpha: 0 }, 700).loop().start();
    game.time.events.add(1000, txtBlink);
  },
  update: function () {
    const enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      game.global.totalCollectBones = 0;
      game.state.start('levelOne'); //for now, later wil go to menu
    }
  }
};

},{}],13:[function(require,module,exports){
const levelData = require('./data/elements.json');
const defaultConfigLevels = require('../../defaultConfigLevels');
const createPlatforms = require('../../createPlatforms');
const createPlayer = require('../../createPlayer');
const createBones = require('../../createBones');
const createTimer = require('../../createTimer');
const createBackgroundMusic = require('../../createBackgroundMusic');
const updateCollisions = require('../../updateCollisions');
const updatePlayer = require('../../updatePlayer');

var sounds, cursors, spaceKey, platforms, player, bones;

function create() {
  config = defaultConfigLevels();
  platforms = createPlatforms(levelData.one.platforms);
  player = createPlayer();
  bones = createBones(16);
  createTimer(15, levelData.one);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;

  game.global.music = createBackgroundMusic();
  game.global.music.play();
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.one);
  updatePlayer(player, cursors, spaceKey);
}

module.exports = { create: create, update: update };

},{"../../createBackgroundMusic":4,"../../createBones":5,"../../createPlatforms":6,"../../createPlayer":7,"../../createTimer":8,"../../defaultConfigLevels":9,"../../updateCollisions":17,"../../updatePlayer":18,"./data/elements.json":15}],14:[function(require,module,exports){
const levelData = require('./data/elements.json');
const defaultConfigLevels = require('../../defaultConfigLevels');
const createPlatforms = require('../../createPlatforms');
const createPlayer = require('../../createPlayer');
const createBones = require('../../createBones');
const createTimer = require('../../createTimer');
const updateCollisions = require('../../updateCollisions');
const updatePlayer = require('../../updatePlayer');

var sounds, cursors, spaceKey, platforms, player, bones;

function create() {
  config = defaultConfigLevels();
  platforms = createPlatforms(levelData.two.platforms);
  player = createPlayer();
  bones = createBones(16);
  clock = createTimer(14, levelData.two);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.two);
  updatePlayer(player, cursors, spaceKey);
}

module.exports = { create: create, update: update };

},{"../../createBones":5,"../../createPlatforms":6,"../../createPlayer":7,"../../createTimer":8,"../../defaultConfigLevels":9,"../../updateCollisions":17,"../../updatePlayer":18,"./data/elements.json":15}],15:[function(require,module,exports){
module.exports={
  "one":{
    "platforms":[
      {"x":400,"y":400},
      {"x":-150,"y":250}
    ],
    "totalBonesCheck": 16,
    "nextLevel": "levelTwo"
  },
  "two":{
    "platforms":[
      {"x":303,"y":130,"scale": [0.5,1]},
      {"x":440,"y":400,"scale": [0.89,1]},
      {"x":-150,"y":270}
    ],
    "totalBonesCheck": 32,
    "nextLevel": "levelTree"
  },
}

},{}],16:[function(require,module,exports){
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

},{"../loadDefaultAssets":10}],17:[function(require,module,exports){
const collectBones = require('./collectBones');

//updateCollisions
module.exports = function (bones, platforms, player, sounds, level) {
  const overlapPlayerBones = function (player, bone) {
    collectBones(player, bone, level, sounds.getBoneSfx);
  };

  game.physics.arcade.collide(bones, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, bones, overlapPlayerBones);
};

},{"./collectBones":3}],18:[function(require,module,exports){
//updatePlayer
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
