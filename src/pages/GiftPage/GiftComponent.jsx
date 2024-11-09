import styles from "./GiftComponent.module.scss";

export const GiftComponent = () => {
  return (
    <div className={styles.gift_container}>
      <div className={styles.gift_icon}>🎁</div>
      <div className={styles.gift_title}>Title</div>
      <div className={styles.gift_description}>Description</div>
      <button className={styles.send_gift_button}>Send a gift</button>
    </div>
  );
};
