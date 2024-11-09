import { makeAutoObservable } from "mobx";

class WalletStore {
  walletData = null;

  constructor() {
    makeAutoObservable(this);
  }

  setWalletData(data) {
    this.walletData = data;
  }

  clearWalletData() {
    this.walletData = null;
  }
}

const walletStore = new WalletStore();
export default walletStore;
