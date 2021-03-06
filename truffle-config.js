require('dotenv').config()

const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider"); 

const private_keys = [
  process.env.ACCOUNT_1,
  process.env.ACCOUNT_2,
  process.env.ACCOUNT_3,
  process.env.ACCOUNT_4
];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: `https://rinkeby.infura.io/v3/${ process.env.INFURA_API_KEY }`,
        numberOfAddresses: 4
      }), 
      network_id: 4,       // Rinkeby's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.3",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    }
  },

  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }

};
