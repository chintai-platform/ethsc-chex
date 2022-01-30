const { expect } = require('chai');
const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');
//const { accounts, contract } = require('@openzeppelin/test-environment');
const { ethers } = require('ethers');
//
////const chex = artifacts.require('Chex');
//const chex = contract.fromArtifact('Chex');
//
//describe('Chex', function () {
//  const [ deployer, owner, wallet, investor ] = accounts;
//  const minter = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MINTER_ROLE'));
//  const pauser = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('PAUSER_ROLE'));
//  const upgrader = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('UPGRADER_ROLE'));
//  const default_admin = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('DEFAULT_ADMIN_ROLE'));
//
//  beforeEach(async function () {
//    //this.chex = await chex.new();
//    this.chex = await chex.new({ from: deployer });
//  });
//
//   it('check initial numeric values', async function () {
//     expect((await this.chex.decimals()).toString()).to.equal('18');
//     expect((await this.chex.totalSupply()).toString()).to.equal('0');
//   });
//
//  // it('check initial string values', async function () {
//  //   expect((await this.chex.name()).toString()).to.equal('Chintai Exchange Token');
//  //   expect((await this.chex.symbol()).toString()).to.equal('CHEX');
//  // });
//
//  it('check mint works', async function () {
//    await this.chex.mint(owner, '1000000000000000000');
//    expect((await this.chex.totalSupply()).toString()).to.equal('1000000000000000000');
//  });
//
//});



const chex = artifacts.require('Chex');

contract('Chex', accounts => {
  let owner = accounts[0];
  console.log("owner = ", owner);
  const alice = accounts[1];
  const bob = accounts[2];

  it('check initial values', async function () {
    const contract = await chex.deployed();

    expect((await contract.name()).toString()).to.equal('Chintai Exchange Token');
    expect((await contract.symbol()).toString()).to.equal('CHEX');
    expect((await contract.decimals()).toString()).to.equal('18');
    expect((await contract.totalSupply()).toString()).to.equal('0');
  });

  it('should mint tokens', async () => {
    const contract = await chex.deployed();

    await contract.mint(owner, '1000000000000000000', {from: owner});
    await contract.mint(alice, '1000000000000000000', {from: owner});
    await contract.mint(bob, '2000000000000000000', {from: owner});

    expect((await contract.totalSupply()).toString()).to.equal('4000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2000000000000000000');
  });

  it('should transfer tokens', async () => {
    const contract = await chex.deployed();

    await contract.transfer(alice, '1000000000000000000', {from:owner});

    expect((await contract.totalSupply()).toString()).to.equal('4000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('0');
    expect((await contract.balanceOf(alice)).toString()).to.equal('2000000000000000000');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2000000000000000000');
  });

  it('should transfer tokens from a non-owner account', async () => {
    const contract = await chex.deployed();

    await contract.transfer(owner, '1000000000000000000', {from:alice});

    expect((await contract.totalSupply()).toString()).to.equal('4000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2000000000000000000');
  });

  it('should transfer tokens from an account with an allowance', async () => {
    const contract = await chex.deployed();

    await contract.increaseAllowance(alice, '500000000000000000', {from:owner});
    expect((await contract.allowance(owner, alice)).toString()).to.equal('500000000000000000');

    await contract.transferFrom(owner, bob, '500000000000000000', {from:alice});

    expect((await contract.totalSupply()).toString()).to.equal('4000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });

  it('should reject a transfer of tokens from an account without allowance', async () => {
    const contract = await chex.deployed();

    await contract.increaseAllowance(alice, '500000000000000000', {from:owner});
    expect((await contract.allowance(owner, alice)).toString()).to.equal('500000000000000000');
    await contract.decreaseAllowance(alice, '500000000000000000', {from:owner});
    expect((await contract.allowance(owner, alice)).toString()).to.equal('0');

    await expectRevert(contract.transferFrom(owner, bob, '500000000000000000', {from:alice}), 'ERC20: transfer amount exceeds allowance');

    expect((await contract.totalSupply()).toString()).to.equal('4000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });

  it('should reject a transfer of tokens from an account without enough balance', async () => {
    const contract = await chex.deployed();

    await expectRevert(contract.transfer(alice, '500000000000000000000', {from:bob}), 'ERC20: transfer amount exceeds balance');
    expect((await contract.totalSupply()).toString()).to.equal('4000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('1000000000000000000');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });

  it('should burn tokens on request', async () => {
    const contract = await chex.deployed();

    await contract.burn('1000000000000000000', {from:alice});
    expect((await contract.totalSupply()).toString()).to.equal('3000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('0');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });

  it('should not burn tokens you do not have', async () => {
    const contract = await chex.deployed();

    await expectRevert(contract.burn('1000000000000000000', {from:alice}), 'ERC20: burn amount exceeds balance -- Reason given: ERC20: burn amount exceeds balance.');
    expect((await contract.totalSupply()).toString()).to.equal('3000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('0');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });

  it('should not burn tokens of someone else', async () => {
    const contract = await chex.deployed();

    await expectRevert(contract.burnFrom(owner, '10000000000000000', {from:bob}), 'ERC20: burn amount exceeds allowance -- Reason given: ERC20: burn amount exceeds allowance.');
    expect((await contract.totalSupply()).toString()).to.equal('3000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('0');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });

  it('should issue tokens with memo', async () => {
    const contract = await chex.deployed();

    await contract.issue(owner, '10000000000000000000', 'This is the memo', {from:owner});
    expect((await contract.totalSupply()).toString()).to.equal('13000000000000000000');
    expect((await contract.balanceOf(owner)).toString()).to.equal('10500000000000000000');
    expect((await contract.balanceOf(alice)).toString()).to.equal('0');
    expect((await contract.balanceOf(bob)).toString()).to.equal('2500000000000000000');
  });


});
