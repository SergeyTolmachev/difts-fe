import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Page } from "@/components/Page.jsx";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <Page>
      <div className={styles.page_container}>
        <div className={styles.welcome_text}>Welcome</div>
        <div className={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Fringilla eget ornare eget
          neque neque. Pretium tempor enim ac in vitae risus cursus. Vel cras
          etiam sed volutpat faucibus.{" "}
        </div>
        <TonConnectButton className={styles.connect_wallet_button} />
        <button
          className={styles.later_button}
          onClick={() => console.log("Later clicked")}
        >
          Later
        </button>
      </div>
    </Page>
  );
};
