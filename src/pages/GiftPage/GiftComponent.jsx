import styles from "./GiftComponent.module.scss";
import GiftIcon from "../../../assets/tonIcon.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
export const GiftComponent = () => {
  return (
    <div className={styles.gift_container}>
      <div className={styles.currency_circle}>
        <img src={GiftIcon} alt="Gift Icon" className={styles.gift_icon} />
        5.30
      </div>
      <div className={styles.gift_img}>🎁</div>
      <div className={styles.gift_title}>Title</div>
      <div className={styles.gift_description}>Description</div>
      <button className={styles.send_gift_button}>Send a gift</button>
      <TonConnectButton className={styles.connect_wallet_button} />
    </div>
  );
};
