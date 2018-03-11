'use strict';

const web3 = require('./web3');
const pkey = require('../config').pkey;

const account = (function(){
  const account = web3.eth.accounts.privateKeyToAccount(pkey);

  return Object.assign(account, {

    async send(tx){
      const { rawTransaction } = await account.signTransaction(tx);
      return await web3.eth.sendSignedTransaction(rawTransaction);
    },

    async psend(tx){
      const { rawTransaction } = await account.signTransaction(tx);
      return await new Promise(function(resolve, reject){
        web3.eth.sendSignedTransaction(rawTransaction)
          .once('transactionHash', resolve)
          .catch(reject);
      });
    }

  });

})()

module.exports = { account };
