// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const CHEX = artifacts.require('CHEX');

module.exports = async function (deployer) {
  const instance = await deployProxy(CHEX, [], { deployer });
  console.log('Deployed', instance.address);
};
