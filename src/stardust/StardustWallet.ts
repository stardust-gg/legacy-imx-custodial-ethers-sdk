/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Wallet } from '@ethersproject/wallet';
import { keccak256 } from '@ethersproject/keccak256';
import StardustSignerAPI from './StardustSignerAPI';

export default class StardustWallet {
  public ethersWallet: Wallet | null = null;

  constructor(
    public readonly id: string,
    public readonly apiKey: string,
    public readonly createdAt: Date,
    public readonly lastUsedAt: Date | null = null
  ) {}

  async getEthersWallet() {
    if (this.ethersWallet) {
      return this.ethersWallet;
    }

    const signerApi = new StardustSignerAPI(this.apiKey);
    const material = await signerApi.signMessage({
      walletId: this.id,
      chainType: 'EVM',
      message: keccak256(Buffer.from(this.id)),
    });

    this.ethersWallet = new Wallet(material.slice(2, 66));
    return this.ethersWallet;
  }
}
