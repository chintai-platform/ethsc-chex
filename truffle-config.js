//const { endpointHTTPS, endpointWSS, privateKey, etherscanAPIKey} = require('./.secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

require("dotenv").config();
const { MNEMONIC, PROJECT_ID } = process.env;

module.exports = {
  plugins: ['truffle-plugin-verify'],

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // live: {
    //   provider: () => new HDWalletProvider(privateKey, endpointWSS),
    //   network_id: 1,
    //   gasPrice: 155000000000
    // },
    // // Useful for deploying to a public network.
    // // NB: It's important to wrap the provider as a function.
    // ropsten: {
    //   provider: () => new HDWalletProvider(privateKey, endpointWSS),
    //   network_id: 3,       // Ropsten's id
    //   gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // }
    goerli: {
      provider: () =>
          new HDWalletProvider(
              MNEMONIC,
              `https://goerli.infura.io/v3/${PROJECT_ID}`,
          ),
      network_id: 5, // Goerli's id
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
  },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11"    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  // api_keys: {
  //   etherscan: etherscanAPIKey
  // }

};
