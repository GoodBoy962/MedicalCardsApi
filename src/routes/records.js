const storage = require('../rpc/storage');
const privateKey = require('../config').pkey;
const getFile = require('../rpc/ipfs').getFile;
const Err = require('../models/Error');
const { decrypt, decryptAssymetrically, sha3 } = require('../lib/cipher');

/**
 * @swagger
 * /records:
 *   get:
 *     x-swagger-router-controller:
 *       records
 *     operationId:
 *       get
 *     tags:
 *       - Records
 *     description: Получение записей пациента
 *     security:
 *       - BasicAuth: []
 *     x-security-scopes:
 *       - all
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: address
 *         type: string
 *         in: query
 *         required: true
 *         pattern: ^(0x)?[0-9A-Fa-f]{40}$
 *         description: адрес пациента
 *     responses:
 *       200:
 *         description: Массив записей
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       500:
 *         description: При появлении внутренней ошибки
 *         schema:
 *           $ref: '#/definitions/RpcError'
 */
async function get({swagger}, res, next) {
  try {
    const address = swagger.params.address.value;
    const patient = await storage.getPatient(address);

    if (!!patient.permissions) {
      const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
      let available = false, passphrase, records = [], profile;
      for (let i in permissions) {
        const decryptedPermission = decryptAssymetrically(privateKey, patient.publicKey, permissions[i]);
        if (decryptedPermission.startsWith(address)) {
          available = true;
          passphrase = decryptedPermission;
          break;
        }
      }
      if (available) {
        profile = JSON.parse(decrypt(await getFile(patient.profile), passphrase));
        const recs = await storage.getRecords(sha3(passphrase));
        if (recs) {
          for (let i in recs) {
            const record = decrypt(await getFile(await recs[i]), passphrase);
            records.push(record);
          }
        }
        res
          .status(200)
          .json(records);
      } else {
        throw new Err.NoAccessError();
      }
    } else {
        throw new Err.NotFoundError();
    }
  } catch(e) {
    next(e);
  }
}

module.exports = { get }
