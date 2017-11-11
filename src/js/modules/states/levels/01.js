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
  updatePlayer(player,cursors,spaceKey);
}

module.exports = {create: create, update: update};
