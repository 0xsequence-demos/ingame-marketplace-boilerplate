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
import { SequenceCheckoutProvider } from "@0xsequence/checkout";
const sdkConfig = getConfig();

export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SequenceConnect config={config}>
          <SequenceCheckoutProvider>
            <MarketplaceProvider config={sdkConfig}>
              <App />
              <ModalProvider />
            </MarketplaceProvider>
          </SequenceCheckoutProvider>
        </SequenceConnect>
      </ToastProvider>
    </ThemeProvider>
  );
}

function App() {
  const { isConnected } = useAccount();
  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/marketplace-hooks-boilerplate"
      name="Marketplace Hooks Boilerplate"
      description="Embedded Wallet"
      faucetUrl="https://www.alchemy.com/faucets/arbitrum-sepolia"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
}
