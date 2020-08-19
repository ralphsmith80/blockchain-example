const { Blockchain } = require('jedicoin');
const EC = require('elliptic');

export class BlockchainService {
  public blockchainInstance = new Blockchain();
  public walletKeys: any = [];

  constructor() {
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('my-wallet-address');

    this.generateWalletKeys();
  }

  getBlocks() {
    return this.blockchainInstance.chain;
  }

  addTransaction(tx: any) {
    return this.blockchainInstance.addTransaction(tx);
  }

  getPendingTransactions() {
    return this.blockchainInstance.getPendingTransactions;
  }

  minePendingTransactions() {
    // INFO: send rewards to my address
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  private generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });
  }
}
