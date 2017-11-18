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
  let config = defaultConfigLevels();
  platforms = createPlatforms(levelData.tree.platforms);
  player = createPlayer();
  bones = createBones(16);
  createTimer(17,levelData.tree);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.tree);
  updatePlayer(player,cursors,spaceKey);
}

module.exports = {create: create, update: update};
