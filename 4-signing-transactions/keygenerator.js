// INFO: add key generator to sign transactions to prevent
// adding/removing coins from wallets you don't own
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log(`\nPrivate key: ${privateKey}`);

console.log(`\nPublic key: ${publicKey}`);
