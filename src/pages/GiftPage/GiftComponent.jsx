import styles from "./GiftComponent.module.scss";
import GiftIcon from "../../../assets/tonIcon.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export const GiftComponent = () => {
  const [tonPrice, setTonPrice] = useState(0);

  useEffect(() => {
    const fetchTonPrice = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd"
      );
      const data = await response.json();
      setTonPrice(data["the-open-network"].usd);
    };
    fetchTonPrice();
  }, []);

  return (
    <div className={styles.gift_container}>
      <div className={styles.currency_circle}>
        <img src={GiftIcon} alt="Gift Icon" className={styles.gift_icon} />
        {tonPrice}
      </div>
      <div className={styles.gift_img}>🎁</div>
      <div className={styles.gift_title}>Title</div>
      <div className={styles.gift_description}>Description</div>
      <button className={styles.send_gift_button}>Send a gift</button>
      <TonConnectButton className={styles.connect_wallet_button} />
    </div>
  );
};
