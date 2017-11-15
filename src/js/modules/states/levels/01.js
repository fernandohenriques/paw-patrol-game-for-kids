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
  createTimer(15,levelData.one);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;

  game.global.music = createBackgroundMusic();
  game.global.music.play();
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.one);
  updatePlayer(player,cursors,spaceKey);
}

module.exports = {create: create, update: update};
