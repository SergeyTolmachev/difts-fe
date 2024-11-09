import { openLink } from "@telegram-apps/sdk-react";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";

import { DisplayData } from "@/components/DisplayData/DisplayData.jsx";
import { Page } from "@/components/Page.jsx";
import { useWalletStore } from "@/stores/WalletStoreProvider";

import "./TONConnectPage.css";

export function TONConnectPage() {
  const wallet = useTonWallet();
  const walletStore = useWalletStore();

  if (!wallet) {
    return (
      <Page>
        <Placeholder
          className="ton-connect-page__placeholder"
          header="TON Connect"
          description={
            <>
              <Text>
                To display the data related to the TON Connect, it is required
                to connect your wallet
              </Text>
              <TonConnectButton className="ton-connect-page__button" />
            </>
          }
        />
      </Page>
    );
  }

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

  return (
    <Page>
      <List>
        {"imageUrl" in wallet && (
          <>
            <Section>
              <Cell
                before={
                  <Avatar
                    src={wallet.imageUrl}
                    alt="Provider logo"
                    width={60}
                    height={60}
                  />
                }
                after={<Navigation>About wallet</Navigation>}
                subtitle={wallet.appName}
                onClick={(e) => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
              >
                <Title level="3">{wallet.name}</Title>
              </Cell>
            </Section>
            <TonConnectButton className="ton-connect-page__button-connected" />
          </>
        )}
        <DisplayData
          header="Account"
          rows={[
            { title: "Address", value: wallet.account.address },
            { title: "Chain", value: wallet.account.chain },
            { title: "Public Key", value: wallet.account.publicKey },
          ]}
        />
        <DisplayData
          header="Device"
          rows={[
            { title: "App Name", value: wallet.device.appName },
            { title: "App Version", value: wallet.device.appVersion },
            {
              title: "Max Protocol Version",
              value: wallet.device.maxProtocolVersion,
            },
            { title: "Platform", value: wallet.device.platform },
            {
              title: "Features",
              value: wallet.device.features
                .map((f) => (typeof f === "object" ? f.name : undefined))
                .filter((v) => v)
                .join(", "),
            },
          ]}
        />
      </List>
    </Page>
  );
}
