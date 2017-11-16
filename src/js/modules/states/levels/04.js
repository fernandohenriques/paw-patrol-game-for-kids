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
  platformsMovable = createPlatforms(levelData.four.platformsMovable,1);
  player = createPlayer();
  bones = createBones(13);
  createTimer(18,levelData.four);

  sounds = config.sounds;
  cursors = config.cursors;
  spaceKey = config.spaceKey;

  /* Bones specifics from this level */
  for (let i = 910; i <= 1010; i+=50) {
    let bone = bones.create(i, 0, 'bone');
    bone.body.gravity.y = 250;
    bone.body.bounce.y = 0.2;
  }
}

function update() {
  updateCollisions(bones, platforms, player, sounds, levelData.four, platformsMovable);
  updatePlayer(player,cursors,spaceKey);
}

module.exports = {create: create, update: update};
