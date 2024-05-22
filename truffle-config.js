//const { endpointHTTPS, endpointWSS, privateKey, etherscanAPIKey} = require('./.secrets.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();

module.exports = {
  plugins: ["truffle-plugin-verify"],

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    "bsc-testnet": {
      provider: () =>
        new HDWalletProvider(
          process.env.MAIN_WALLET_MNUMONIC,
          "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
        ),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      verify: {
        apiUrl: "https://api-testnet.bscscan.com/api",
        apiKey: process.env.BSCSCAN_API_KEY,
        explorerUrl: "https://testnet.bscscan.com/",
      },
    },
    "base-mainnet": {
      provider: () =>
        new HDWalletProvider(
          process.env.MAIN_WALLET_KEY,
          "https://white-nameless-bridge.base-mainnet.quiknode.pro/0de97bcbc4e2ded260513dfb43dd480b223d0c7f/"
        ),
      network_id: 8453,
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      verify: {
        apiUrl: "https://api.basescan.org/api",
        apiKey: process.env.BASESCAN_API_KEY,
        explorerUrl: "https://basescan.org",
      },
    },
    "base-sepolia": {
      provider: () =>
        new HDWalletProvider(
          process.env.MAIN_WALLET_MNUMONIC,
          `https://sepolia.base.org`
        ),
      network_id: 84532,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      verify: {
        apiUrl: "https://api-sepolia.basescan.org/api",
        apiKey: process.env.BASESCAN_API_KEY,
        explorerUrl: "https://sepolia.basescan.org",
      },
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(
          process.env.MAIN_WALLET_MNUMONIC,
          `https://goerli.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 5,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    sepolia: {
      provider: () =>
        new HDWalletProvider(
          process.env.MAIN_WALLET_MNUMONIC,
          `https://sepolia.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 11155111, // Goerli's id
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.25", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
  api_keys: {
    "base-sepolia": process.env.BASESCAN_API_KEY ?? "",
    "base-mainnet": process.env.BASESCAN_API_KEY ?? "",
    etherscan: process.env.ETHERSCAN_API_KEY ?? "",
    basescan: process.env.ETHERSCAN_API_KEY ?? "",
    sepolia: process.env.ETHERSCAN_API_KEY ?? "",
    goerli: process.env.ETHERSCAN_API_KEY ?? "",
  },
};
