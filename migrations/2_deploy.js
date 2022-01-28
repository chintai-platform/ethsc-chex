// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Chex = artifacts.require('Chex');

module.exports = async function (deployer) {
  const instance = await deployProxy(Chex, ['Chintai Exchange Token','CHEX'], { deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};
