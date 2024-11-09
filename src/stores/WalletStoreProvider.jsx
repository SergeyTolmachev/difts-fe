import React, { createContext, useContext } from "react";
import walletStore from "./walletStore";

const WalletStoreContext = createContext();

export const WalletStoreProvider = ({ children }) => {
  return (
    <WalletStoreContext.Provider value={walletStore}>
      {children}
    </WalletStoreContext.Provider>
  );
};

export const useWalletStore = () => {
  return useContext(WalletStoreContext);
};
