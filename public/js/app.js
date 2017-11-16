(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.game = new Phaser.Game(1067, 600, Phaser.AUTO, 'gameDiv');

game.global = { music: {}, timeLevel: 0, score: 0, collectedBones: 0 };

game.state.add('boot', require('./modules/states/boot'));
game.state.add('load', require('./modules/states/load'));
game.state.add('levelOne', require('./modules/states/levels/01'));
game.state.add('levelTwo', require('./modules/states/levels/02'));
game.state.add('levelTree', require('./modules/states/levels/03'));
game.state.add('levelFour', require('./modules/states/levels/04'));
game.state.add('end', require('./modules/states/end'));

game.state.start('boot');

},{"./modules/states/boot":12,"./modules/states/end":13,"./modules/states/levels/01":14,"./modules/states/levels/02":15,"./modules/states/levels/03":16,"./modules/states/levels/04":17,"./modules/states/load":19}],2:[function(require,module,exports){
//calculateScore
module.exports = function (isGameOver) {
    let score = (game.global.timeLevel + 1) * game.global.collectedBones;
    game.global.score += score;
    game.global.timeLevel = 0;
    game.global.collectedBones = 0;
    if (isGameOver) game.global.timeLevel = -1;
};

},{}],3:[function(require,module,exports){
const calculateScore = require('./calculateScore');

//checkEndGame
module.exports = function (quantityCheck, nextLevel, timeClosed = false) {
  let nextState = false;
  if (game.global.collectedBones == quantityCheck) nextState = nextLevel;else if (timeClosed) nextState = 'end';

  if (nextState) {
    calculateScore(timeClosed);
    const go = () => game.state.start(nextState);
    game.camera.fade('#000', 800);
    game.camera.onFadeComplete.add(go);
  }
};

},{"./calculateScore":2}],4:[function(require,module,exports){
const checkEndGame = require('./checkEndGame');

//collectBones
module.exports = function (player, bone, level, sfx = false) {
  if (sfx) sfx.play();
  bone.kill();
  game.global.collectedBones++;
  checkEndGame(level.totalBonesCheck, level.nextLevel);
};

},{"./checkEndGame":3}],5:[function(require,module,exports){
module.exports = function () {
  let music = game.add.audio('bgSound');
  music.loop = true;
  music.volume = 0.1;

  return music;
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
//createPlatforms
module.exports = function (levelData, isMovable = 0) {
  let platforms = game.add.group();
  platforms.enableBody = true;

  for (let key in levelData) {
    let platform = platforms.create(levelData[key].x, levelData[key].y, 'platform');
    platform.body.immovable = true;
    if ("scale" in levelData[key]) platform.scale.setTo(levelData[key].scale[0], levelData[key].scale[1]);
  }

  if (!isMovable) {
    //create Ground
    let ground = platforms.create(0, game.world.height - 57.6, 'platform');
    ground.scale.setTo(2.6675, 1.8);
    ground.body.immovable = true;
  }

  return platforms;
};

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
const checkEndGame = require('./checkEndGame');

//createTimer
module.exports = function (timer, level) {
  let txtTimer = game.add.text(game.width - 10, 10, '00:' + timer, { font: '35px grobold', fill: '#fff' });
  txtTimer.anchor.set(1, 0);

  const updateTime = () => {
    if (timer > 0) timer--;else if (timer == 0) checkEndGame(level.totalBonesCheck, level.nextLevel, 1);
    txtTimer.text = '00:' + (timer < 10 ? '0' : '') + timer;
    if (game.global.timeLevel != -1) game.global.timeLeve = timer;
  };

  game.time.events.loop(1000, updateTime);
};

},{"./checkEndGame":3}],10:[function(require,module,exports){
//defaultConfigLevels
module.exports = function () {
  game.add.sprite(0, 0, 'background');

  let getBoneSfx = game.add.audio('getBone');
  let cursors = game.input.keyboard.createCursorKeys();
  let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  let sounds = { getBoneSfx: getBoneSfx };

  return { sounds: sounds, cursors: cursors, spaceKey: spaceKey };
};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
module.exports = {
  preload: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('progressBar', 'assets/images/progress_bar.png');
  },
  create: function () {
    game.state.start('load');
  }
};

},{}],13:[function(require,module,exports){
module.exports = {
  preload: function () {
    game.global.music.stop();
    let mainMsgEnd = 'COMPLETE GAME, CONGRATULATIONS!';
    let sizeMainMsg = 50;
    if (game.global.timeLevel == -1) {
      let soundGameOver = game.add.audio('gameOver');
      soundGameOver.play();
      mainMsgEnd = 'GAME OVER';
      sizeMainMsg = 70;
    }

    let textGameOver = game.add.text(game.world.centerX, 280, mainMsgEnd, { font: sizeMainMsg + 'px grobold', fill: '#fff' });
    textGameOver.anchor.set(0.5);

    let textScore = game.add.text(game.world.centerX, 150, 'YOUR SCORE: ' + game.global.score, { font: '11.5px emulogic', fill: '#fff' });
    textScore.anchor.set(0.5);
  },
  create: function () {
    let txtPressEnter = game.add.text(game.world.centerX, 555, 'PRESS ENTER TO RESTART', { font: '15px emulogic', fill: '#fff' });
    txtPressEnter.anchor.set(0.5);
    game.add.tween(txtPressEnter).to({ y: 355 }, 1000).start();

    const txtBlink = () => game.add.tween(txtPressEnter).to({ alpha: 1 }, 700).to({ alpha: 0 }, 700).loop().start();
    game.time.events.add(1000, txtBlink);
  },
  update: function () {
    const enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      game.global.timeLevel = 0;
      game.state.start('levelOne'); //for now, later wil go to menu
    }
  }
};

},{}],14:[function(require,module,exports){
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

},{"../../createBackgroundMusic":5,"../../createBones":6,"../../createPlatforms":7,"../../createPlayer":8,"../../createTimer":9,"../../defaultConfigLevels":10,"../../updateCollisions":20,"../../updatePlayer":21,"./data/elements.json":18}],15:[function(require,module,exports){
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
  createTimer(16, levelData.two);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.two);
  updatePlayer(player, cursors, spaceKey);
}

module.exports = { create: create, update: update };

},{"../../createBones":6,"../../createPlatforms":7,"../../createPlayer":8,"../../createTimer":9,"../../defaultConfigLevels":10,"../../updateCollisions":20,"../../updatePlayer":21,"./data/elements.json":18}],16:[function(require,module,exports){
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
  platforms = createPlatforms(levelData.tree.platforms);
  player = createPlayer();
  bones = createBones(16);
  createTimer(17, levelData.tree);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.tree);
  updatePlayer(player, cursors, spaceKey);
}

module.exports = { create: create, update: update };

},{"../../createBones":6,"../../createPlatforms":7,"../../createPlayer":8,"../../createTimer":9,"../../defaultConfigLevels":10,"../../updateCollisions":20,"../../updatePlayer":21,"./data/elements.json":18}],17:[function(require,module,exports){
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
  platforms = createPlatforms(levelData.four.platforms);
  platformsMovable = createPlatforms(levelData.four.platformsMovable, 1);
  player = createPlayer();
  bones = createBones(13);
  createTimer(18, levelData.four);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;

  /* Bones specifics from this level */
  for (let i = 910; i <= 1010; i += 50) {
    let bone = bones.create(i, 0, 'bone');
    bone.body.gravity.y = 250;
    bone.body.bounce.y = 0.2;
  }
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.four, platformsMovable);
  updatePlayer(player, cursors, spaceKey);
}

module.exports = { create: create, update: update };

},{"../../createBones":6,"../../createPlatforms":7,"../../createPlayer":8,"../../createTimer":9,"../../defaultConfigLevels":10,"../../updateCollisions":20,"../../updatePlayer":21,"./data/elements.json":18}],18:[function(require,module,exports){
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
    "nextLevel": "end"
  },
  "tree":{
    "platforms":[
      {"x":850,"y":450},
      {"x":335,"y":310},
      {"x":-150,"y":250}
    ],
    "totalBonesCheck": 48,
    "nextLevel": "levelFour"
  },
  "four":{
    "platforms":[
      {"x":335,"y":310},
      {"x":-150,"y":250}
    ],
    "platformsMovable":[
      {"x":850,"y":450}
    ],
    "totalBonesCheck": 64,
    "nextLevel": "end"
  }
}

},{}],19:[function(require,module,exports){
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

},{"../loadDefaultAssets":11}],20:[function(require,module,exports){
const collectBones = require('./collectBones');

//updateCollisions
module.exports = function (bones, platforms, player, sounds, level, platformsMovable = false) {
  const overlapPlayerBones = function (player, bone) {
    collectBones(player, bone, level, sounds.getBoneSfx);
  };

  const collidePlayerPlatformMovable = function (player, platformMovel) {
    if (platformMovel.y - 70 > player.y) platformMovel.body.immovable = false;
  };

  game.physics.arcade.collide(bones, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, bones, overlapPlayerBones);

  if (platformsMovable) {
    game.physics.arcade.collide(player, platformsMovable, collidePlayerPlatformMovable);
  }
};

},{"./collectBones":4}],21:[function(require,module,exports){
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
