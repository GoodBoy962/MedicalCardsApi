const ipfsAPI = require('ipfs-api');
const ipfsConf = require('../config').ipfs;
const ipfs = ipfsAPI(ipfsConf.ipfsUrl, ipfsConf.ipfsPort);

const getFile =
  ipfsPath =>
    new Promise(
      resolve => {
        ipfs.files.cat(ipfsPath, (e, file) => {
          resolve(file.toString('utf8'));
        });
      });

const addFile =
  file =>
    new Promise(
      resolve => {
        ipfs.files.add(Buffer.from(file), (err, files) => {
          resolve(files[0].hash);
        })
      }
    );

module.exports = { getFile, addFile };
