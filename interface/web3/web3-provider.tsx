"use client"

import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "@/web3/config";

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>{children}</WagmiProvider>
  );
}
