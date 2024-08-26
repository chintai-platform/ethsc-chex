const { deployProxy, upgradeProxy, forceImport} = require('@openzeppelin/truffle-upgrades');
require("dotenv").config();


const Chex = artifacts.require('Chex');
const ChexV2 = artifacts.require('ChexV2');
const ChexV3 = artifacts.require('ChexV3');

module.exports = async function (deployer) {
  const deployedProxyAddress = process.env.DEPLOYED_PROXY_ADDRESS;
  await forceImport(deployedProxyAddress, ChexV2);
  const upgraded = await upgradeProxy(deployedProxyAddress, ChexV3, { deployer });
  console.log('Upgraded', upgraded.address);
}