import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { sepolia } from "viem/chains";
import { REOWN_PROJECT_ID } from "../constants";
// 1. Get projectId
const projectId = REOWN_PROJECT_ID;

// 2. Set the networks
const networks = [sepolia];

// 3. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: networks as any,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

export default function ReownContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
