const crypto = require('crypto');
const { IncomingMessage } = require('http');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    // INFO: random number that has nothing to do with the block
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
  // INFO: Add mine block to enable proof-of-work algorithm
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
    // INFO: add difficulty
    this.difficulty = 2;
  }
  createGenesisBlock() {
    return new Block(0, new Date().toUTCString(), 'Genesis block', '0');
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(data) {
    const timestamp = new Date().toUTCString();
    const index = this.chain.length;
    const previousHash = this.getLatestBlock().hash;
    const newBlock = new Block(index, timestamp, data, previousHash);
    // INFO: mine the new block with proof-of-work
    newBlock.mineBlock(this.difficulty);
    // Validating the block here is not much help since the creation of a block is
    // private except for the data. i.e. this validates we didn't break our own chain
    if (this.isValidBlock(newBlock)) {
      this.chain.push(newBlock);
    } else {
      console.error('Invalid block!');
    }
  }
  isValidBlock(newBlock) {
    const currentBlock = this.chain[this.chain.length - 1];

    // has the correct index
    if (currentBlock.index + 1 !== newBlock.index) {
      return false;
    } else if (newBlock.previousHash !== currentBlock.hash) {
      return false;
    } else if (newBlock.hash !== newBlock.calculateHash()) {
      return false;
    }
    return true;
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

console.log('Minning block 1...');
jediCoin.addBlock({ amount: 4 });

console.log('Minning block 2...');
jediCoin.addBlock({ amount: 10 });

// console.log('Valid chain:', jediCoin.isValid());

// Test for tampering with a block
// jediCoin.chain[1].data = { amount: 100 };
// jediCoin.chain[1].hash = jediCoin.chain[1].calculateHash();

// console.log('Valid chain:', jediCoin.isValid());
// jediCoin.printChain();
