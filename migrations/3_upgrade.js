// migrations/NN_deploy_upgradeable_box.js
const { forceImport, upgradeProxy} = require('@openzeppelin/truffle-upgrades');

const Chex = artifacts.require('Chex');
const ChexV2 = artifacts.require('ChexV2');

console.log("DAVIDE I AM HERE")
module.exports = async function (deployer) {
  const proxyAddress = "0x91F4A4Ed80931490DC3B0A35D4a29AdE18f4cA10";
  const existingProxy = await forceImport(proxyAddress, Chex, { deployer });
  console.log("existingProxy:",existingProxy);
  const instance = await upgradeProxy(proxyAddress, ChexV2);
  console.log('Deployed', instance.address);
};
