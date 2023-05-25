import { ThirdwebProvider, ChainId, useContract } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import { Gorditas } from "next/font/google";

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
      <Head>
        <title>D=D Access Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DaDeuce, and you can too!" />
        <meta
          name="keywords"
          content="DaDeuce, Thirdweb, Web3, NFT, DAO, DeDeux"
        />
        <meta name="author" content="Tippi Fifestarr" />
      </Head>
      <main className={`${gorditas.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThirdwebProvider>
  );
}

function Component() {
  const { contract, isLoading } = useContract(
    "0xe003E4487f62cf8fa6a84C517293780b85aedb86"
  );
}

export default MyApp;
