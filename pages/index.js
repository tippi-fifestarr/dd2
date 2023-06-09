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
            By{" "}
            <a href="https://devpost.com/tippi-fifestarr" target="_blank">
              Tippi Fifestarr
            </a>{" "}
            with help from{" "}
            <a href="https://github.com/wyy511511" target="_blank">
              Lunasol
            </a>{" "}
            😁 It&apos;s open-source, so you can help too!
          </p>
          <p className={styles.description}>
            All are welcome to play a uniquely web3 card game experience where
            you can deduce, choose, and have fun, win or lose! Much much more
            coming soon 🤭 still on mumbai testnet 🏗️
          </p>
          <h1 className={styles.description}>
            If you don&apos;t know web3, click{" "}
            <a href="https://dadeuce.vercel.app/" target="_blank">
              WEB2 DaDeuce DEMO
            </a>{" "}
            to play the demo version, using random celebs from TMDB API.
          </h1>
          <p className="m-1 text-center">
            (or just join the web3 revolution already!) 👇
          </p>

          <div className="flex flex-col items-center justify-center min-h-fit">
            <ConnectWallet btnTitle="Connect d' wallet" />
            <Nft />
            <ClaimButton />
          </div>
          <h1 className={styles.description}>
            ^ Free Access Key ^ <br /> 👇 Access these: 👇{" "}
          </h1>

          {/* now add in a thirdweb claim nft button for the access card that displays after they connected their wallet.*/}

          <div className={styles.grid}>
            {/* want to use Link bc internal links */}
            <a
              href="https://snapshot.org/#/wingbird.eth/proposal/0x1aa2cd5fab1c40beec0665c7e30ede99df38c20bc5362579f01ff69cefc7ebf4"
              className={styles.card}
            >
              <h2>First Vote, we choose a name! 😃 &rarr;</h2>
              <p>
                Lets scale with progressive decentralization! DaDeuce DeDuece
                DoDeaux D-Deux D.Duce DiDoose?
              </p>
            </a>
            {/* want to use Link bc internal links */}
            <Link
              href="https://dd2-git-gated-page-tippi-fifestarr.vercel.app/login"
              className={styles.card}
            >
              <h2>DD OG Default Deck 🎴 &rarr;</h2>
              <p>
                Welcome to DDEUX, a game of strategy, mystery, and a dash of
                luck! Round 1 - Guess Who: In the first round, you&apos;ll be
                presented with a deck of 20 cards, each featuring a unique
                character or location. Your goal is to guess which card your
                friend has chosen, using only yes or no questions. You can ask
                about anything you see on the card - the character&apos;s
                attributes, their origin, their catchphrase - anything that will
                help you narrow down the possibilities (double-click to flip the
                card&apos;s you&apos;ve eliminated). But remember, you only have
                20 questions to identify the card!
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
