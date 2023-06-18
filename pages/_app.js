import { ThirdwebProvider, ChainId, useContract } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Gorditas } from "next/font/google";
import { domainName } from "../const/yourDetails";
import Meta from "../components/Meta";

const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gorditas",
});

const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
    >
      <Meta />
      <main className={`${gorditas.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThirdwebProvider>
  );
}

export default MyApp;
