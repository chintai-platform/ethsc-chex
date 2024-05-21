// migrations/NN_deploy_upgradeable_box.js
const { forceImport, upgradeProxy} = require('@openzeppelin/truffle-upgrades');

const Chex = artifacts.require('Chex');
const ChexV2 = artifacts.require('ChexV2');

module.exports = async function (deployer) {
  const existingProxy = await forceImport("0xaED75A1c0c2a7d2bF0a0Ced267474AfeCe21897f", Chex, { deployer });
  const instance = await upgradeProxy("0xaED75A1c0c2a7d2bF0a0Ced267474AfeCe21897f", ChexV2, { deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};
