import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Root } from "@/components/Root";
import { init } from "@/init.js";
import { WalletStoreProvider } from "@/stores/WalletStoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@telegram-apps/telegram-ui/dist/styles.css";

// Mock the environment in case, we are outside Telegram.
import "./mockEnv.js";

// Configure all application dependencies.
init(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletStoreProvider>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </WalletStoreProvider>
  </StrictMode>
);
