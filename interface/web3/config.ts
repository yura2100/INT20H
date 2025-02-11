import { createConfig, http } from "wagmi";
import { holesky } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  ssr: true,
  chains: [holesky],
  transports: {
    [holesky.id]: http(),
  },
  connectors: [
    metaMask(),
  ],
});
