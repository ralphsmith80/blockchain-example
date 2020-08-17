const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data)
      )
      .digest('hex');
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
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
jediCoin.addBlock({ amount: 4 });
jediCoin.addBlock({ amount: 10 });

console.log('Valid chain:', jediCoin.isValid());

// Test for tampering with a block
// jediCoin.chain[1].data = { amount: 100 };
// jediCoin.chain[1].hash = jediCoin.chain[1].calculateHash();

console.log('Valid chain:', jediCoin.isValid());
jediCoin.printChain();
