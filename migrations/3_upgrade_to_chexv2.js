const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
require("dotenv").config();


const ChexV2 = artifacts.require('ChexV2');

module.exports = async function (deployer) {
  const deployedProxyAddress = process.env.DEPLOYED_PROXY_ADDRESS;
  const upgraded = await upgradeProxy(deployedProxyAddress, ChexV2, { deployer, initializer: 'initialize' });
  console.log('Upgraded', upgraded.address);
}