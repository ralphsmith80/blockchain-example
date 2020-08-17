const crypto = require('crypto');

// INFO: add transaction class
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  // INFO: remove index, change data to transactions
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest('hex');
  }
  mineBlock(difficulty) {
    // Ensure the block hash starts with enough zeros to ensure the
    // difficulty rating is achieved.
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Blocked mined: ${this.hash}`);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    // INFO: all transactions are held in memory until they are added into the next Block.
    // In Bitcoins case the proof-of-work algorithm ensure a new block is only created every 10 minutes.
    this.pendingTransactions = [];
    this.miningReward = 100;
  }
  createGenesisBlock() {
    return new Block(new Date().toUTCString(), 'Genesis block', '0');
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  // INFO: change mining method
  minePendingTransactions(miningRewardAddress) {
    const timestamp = new Date().toUTCString();
    // INFO: in real world block chains like Bitcoin you cannot add all pending transactions
    // because there are too many and a block cannot increase more than 1MB.
    // In that case the miner chooses which transactions to include.
    let block = new Block(timestamp, this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    // INFO: reset the pending transaction and add the mining reward
    // INFO: one node could change this to report more rewards but other nodes would
    // ignore the change i.e. consensus
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }
  // INFO: add method to add transactions
  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }
  // INFO: add method to get balance
  // Addresses don't have balances to achieve this you must iterate over the
  // the transaction list to sum your balance.
  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }
  isValid() {
    // Check if the Genesis block hasn't been tampered with by comparing
    // the output of createGenesisBlock with the first block on our chain
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
  printChain() {
    console.log(JSON.stringify(this.chain, '', 2));
  }
}

let jediCoin = new Blockchain();

// INFO: creat transactions - addressX would be the public address
jediCoin.createTransaction(new Transaction('address1', 'address2', 100));
jediCoin.createTransaction(new Transaction('address2', 'address1', 50));

// INFO: start the miner
console.log('\nStarting the miner...');
jediCoin.minePendingTransactions('ralphsmith.crypto');

// INFO: minors reward will not be present until the next block
console.log('Balances:');
console.table({
  'ralphsmith.crypto': jediCoin.getBalanceOfAddress('ralphsmith.crypto'),
  address1: jediCoin.getBalanceOfAddress('address1'),
  address2: jediCoin.getBalanceOfAddress('address2'),
});

// INFO: we can see the reward from the previous block but this adds another reward
console.log('\nStarting the miner again...');
jediCoin.minePendingTransactions('ralphsmith.crypto');
console.log('Balances:');
console.table({
  'ralphsmith.crypto': jediCoin.getBalanceOfAddress('ralphsmith.crypto'),
  address1: jediCoin.getBalanceOfAddress('address1'),
  address2: jediCoin.getBalanceOfAddress('address2'),
});
