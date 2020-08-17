// INFO: refactor out Blockchain classes
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// INFO: initialize key
// this comes from running `node keygenerator.js`
const myKey = ec.keyFromPrivate(
  'ab7541f1d4a0c35e3e2a3bddb6735b6409f15f0b7a28f8e5931bcdde67c027fe'
);
const myWalletAddress = myKey.getPublic('hex');

let jediCoin = new Blockchain();

// INFO: create a new transaction, sign it, add it to pending transactions
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
jediCoin.addTransaction(tx1);

console.log('Starting the miner...');
// INFO: ensure the address is updated or you coins will go to some rando
// without a way to access them because there is no private key
// jediCoin.minePendingTransactions('ralphsmith.crypto');
jediCoin.minePendingTransactions(myWalletAddress);

console.log('Balances:');
console.table({
  myWalletAddress: jediCoin.getBalanceOfAddress(myWalletAddress),
});

// INFO: tamper with blockchain
// change amount of sent coins fails because the signature doesn't match
// jediCoin.chain[1].transactions[0].amount = 1;

console.log(`Is chain valid? ${jediCoin.isValid()}`);
