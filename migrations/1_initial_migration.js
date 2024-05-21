const Migrations = artifacts.require("Migrations");
console.log("PHILLIP I AM HERE")

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
