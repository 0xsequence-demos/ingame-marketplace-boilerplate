import { SequenceConnect } from "@0xsequence/connect";
import { config, getConfig } from "./config";

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { NotConnected } from "./views/NotConnected";
import { Connected } from "./views/Connected";
import { SequenceBoilerplate } from "@0xsequence-demos/boilerplate-design-system";
import { ThemeProvider, ToastProvider } from "@0xsequence/design-system";
import {
  MarketplaceProvider,
  ModalProvider,
} from "@0xsequence/marketplace-sdk/react";

const sdkConfig = getConfig();

export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SequenceConnect config={config}>
          <MarketplaceProvider config={sdkConfig}>
            <App />
            <ModalProvider />
          </MarketplaceProvider>
        </SequenceConnect>
      </ToastProvider>
    </ThemeProvider>
  );
}

function App() {
  const { isConnected } = useAccount();
  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/ingame-marketplace-boilerplate"
      name="Sequence In-Game Marketplace Boilerplate"
      description="Embedded Wallet"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
}
