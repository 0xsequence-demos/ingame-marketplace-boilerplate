import { createConfig } from "@0xsequence/kit";
import { SdkConfig } from "@0xsequence/marketplace-sdk";

// Get your own keys on sequence.build
const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
const projectId = import.meta.env.VITE_PROJECT_ID;
const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
const appleRedirectURI = window.location.origin + window.location.pathname;
const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_ID;

export const config: any = createConfig("waas", {
  projectAccessKey: projectAccessKey,
  chainIds: [1, 421614, 13473],
  defaultChainId: 421614,
  appName: "Kit Starter",
  waasConfigKey,
  googleClientId,
  appleClientId,
  appleRedirectURI,
  walletConnectProjectId,
});

export const marketplaceConfig: SdkConfig = {
  projectAccessKey: projectAccessKey,
  projectId: projectId,
  wallet: {
    walletConnectProjectId,
    embedded: {
      waasConfigKey,
      appleClientId,
      appleRedirectURI,
      googleClientId,
    },
  },
  _internal: undefined,
};
