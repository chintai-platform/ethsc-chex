// migrations/NN_deploy_upgradeable_box.js
const { deployProxy, upgradeProxy} = require('@openzeppelin/truffle-upgrades');

const Chex = artifacts.require('Chex');
const ChexV2 = artifacts.require('ChexV2');

module.exports = async function (deployer) {
  const alreadyDeployed = await Chex.deployed();
  console.log(alreadyDeployed);
  const instance = await upgradeProxy(Chex.address, ChexV2, { deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};
