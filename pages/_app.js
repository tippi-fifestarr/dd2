import { ThirdwebProvider, ChainId, useContract } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Gorditas } from "next/font/google";
import Meta from "../components/Meta";

const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gorditas",
});

// const oswald = Oswald({
//   subsets: ["latin"],
//   weight: ["200", "400", "700"],
//   variable: "--font-oswald",
// });

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Meta />
      <main className={`${gorditas.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThirdwebProvider>
  );
}

export default MyApp;
