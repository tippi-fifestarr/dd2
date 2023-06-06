import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import ClaimButton from "../components/ClaimButton";
import Nft from "../components/Nft";
// import Meta from "../components/Meta";

export default function Home() {
  return (
    <>
      {/* <Meta /> */}
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            This is a 🧊 web3 game built with love for the{" "}
            <a href="https://github.com/tippi-fifestarr/dd2" target="_blank">
              Chainlink 2023 Spring Hackathon!
            </a>
          </h1>
          <p className={styles.description}>
            By Tippi Fifestarr with help from Amber the Yaoyao 😁 It&apos;s
            open-source, so you can help too!
          </p>
          <p className="m1 text-center">
            If you don&apos;t know web3, choose web2 demo below (or just join
            the web3 revolution already!) 👇
          </p>

          <div className="flex flex-col items-center justify-center min-h-screen">
            <ClaimButton />
            <Nft />
          </div>
          <p className={styles.description}>
            If you have a wallet, connect to claim your Access Key{" "}
            <code className={styles.code}>currently on Mumbai testnet</code>,
            then collect the first Default Deck{" "}
            <code className={styles.code}>also on Mumbai</code> to play the
            deluxe version. Or click{" "}
            <a href="https://dadeuce.vercel.app/" target="_blank">
              DaDeuce Link
            </a>{" "}
            to play the demo version, using random celebs from TMDB API.
          </p>

          <div className={styles.connect}>
            <ConnectWallet btnTitle="Connect d' wallet" />
          </div>
          {/* now add in a thirdweb claim nft button for the access card that displays after they connected their wallet.*/}

          <div className={styles.grid}>
            {/* want to use Link bc internal links */}
            <a href="/vote" className={styles.card}>
              <h2>Vote! 😃 &rarr;</h2>
              <p>DaDeuce DeDuece DoDeaux D-Deux D.Duce DiDoose</p>
            </a>
            {/* want to use Link bc internal links */}
            <Link
              href="https://dd2-git-gated-page-tippi-fifestarr.vercel.app/login"
              className={styles.card}
            >
              <h2>DD OG Default Deck 🎴 &rarr;</h2>
              <p>
                If no deck: &quot;Collect and play with the *OG Web3 DD, free
                forever!*&quot; if OGDD: &quot;Play now with the OG Web3
                DD!&quot;
              </p>
            </Link>
            {/* want to use Link bc internal links */}
            <Link
              href="https://github.com/tippi-fifestarr/dd2/tree/claim"
              className={styles.card}
            >
              <h2>More Decks ☄️ &rarr;</h2>
              <p>
                Create your own deck, or collect more decks from the
                marketplace! (Coming soon)
              </p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
