'use strict';

const {
  NODE_ENV = 'development',

  PORT = 8080,
  API_KEY = 'key',
  HOST_URI = 'localhost:8080',

  CONTRACT_ADDR = '0x22ce043901ad9f065469ca042974e7a895ba4ac8',
  PKEY = '',

  ETHEREUM_RPC = '',

  IPFS_URL = 'localhost',
  IPFS_PORT = '5001'
} = process.env;

module.exports = {
  env: NODE_ENV,

  app: {
    port: PORT,
    apiKey: API_KEY,
    hostUri: HOST_URI
  },

  contract: CONTRACT_ADDR,

  pkey: PKEY,

  rpc: {
    ethereum: ETHEREUM_RPC
  },

  ipfs: {
    ipfsUrl: IPFS_URL,
    ipfsPort: IPFS_PORT
  }

};
