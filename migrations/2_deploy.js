// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const CHEX = artifacts.require("CHEX");

module.exports = function(deployer) {
    deployer.deploy(CHEX);
};
