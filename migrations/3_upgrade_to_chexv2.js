const { deployProxy, upgradeProxy, forceImport} = require('@openzeppelin/truffle-upgrades');
require("dotenv").config();


const Chex = artifacts.require('Chex');
const ChexV2 = artifacts.require('ChexV2');

module.exports = async function (deployer) {
  const deployedProxyAddress = process.env.DEPLOYED_PROXY_ADDRESS;
  await forceImport(deployedProxyAddress, Chex);
  const upgraded = await upgradeProxy(deployedProxyAddress, ChexV2, { deployer, initializer: 'initialize' });
  console.log('Upgraded', upgraded.address);
}