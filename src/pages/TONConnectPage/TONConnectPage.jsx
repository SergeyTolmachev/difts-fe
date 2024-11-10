import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { GiftComponent } from "@/pages/GiftPage/GiftComponent";
import { Page } from "@/components/Page.jsx";
import { useWalletStore } from "@/stores/WalletStoreProvider";
import styles from "./TONConnectPage.module.scss";
import {Link} from "react-router-dom";

export function TONConnectPage() {
  const wallet = useTonWallet();
  const walletStore = useWalletStore();

  console.log("Wallet:", wallet);

  if (!wallet) {
    return (
      <Page>
        <div className={styles.page_container}>
          <div className={styles.welcome_text}>Welcome</div>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Fringilla eget ornare eget
            neque neque. Pretium tempor enim ac in vitae risus cursus. Vel cras
            etiam sed volutpat faucibus.
          </div>
          <TonConnectButton className={styles.connect_wallet_button} />
          <Link to={'/products'}>
            <button className={styles.later_button}>
              Later
            </button>
          </Link>
        </div>
      </Page>
    );
  }

  if (wallet.account) {
    walletStore.setWalletData({
      address: wallet.account.address,
      chain: wallet.account.chain,
      publicKey: wallet.account.publicKey,
      appName: wallet.device.appName,
      appVersion: wallet.device.appVersion,
      maxProtocolVersion: wallet.device.maxProtocolVersion,
      platform: wallet.device.platform,
      features: wallet.device.features,
      name: wallet.name,
      imageUrl: wallet.imageUrl,
      aboutUrl: wallet.aboutUrl,
    });
  } else {
    console.log("Wallet account is not available");
  }

  return (
    <Page>
      <GiftComponent />
      <TonConnectButton className={styles.connect_wallet_button} />
    </Page>
  );
}
