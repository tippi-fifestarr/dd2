import React, { useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { getUser } from "../auth.config";
import checkBalance from "../util/checkBalance";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const { logout } = useLogout();
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Restricted Access Page</h1>
      <p className={styles.explain}>
        Thanks for being a member of our NFT community!
      </p>

      <button className={styles.mainButton} onClick={logout}>
        Logout
      </button>
      {/* link to https://dd2-smoky.vercel.app/play */}
      <br />
      <a
        href="https://dd2-smoky.vercel.app/play"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mainButton}
      >
        DDEUX/Play
      </a>
      {/* link in style of mainbutton to the guide i wrote about building the ddeuce https://fifestarr-d-gitbook.gitbook.io/fifestarr-d-gitbook/dashboard-or-sdk-nft-access-key-for-dumdums-how-to-guide-devrel-uni-part-1 */}
      <br />
      <a
        href="https://fifestarr-d-gitbook.gitbook.io/fifestarr-d-gitbook/dashboard-or-sdk-nft-access-key-for-dumdums-how-to-guide-devrel-uni-part-1"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mainButton}
      >
        DDocumentation
      </a>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Ensure we are able to generate an auth token using our private key instantiated SDK
  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai"
  );

  // Check to see if the user has an NFT
  const hasNft = await checkBalance(sdk, user.address);

  // If they don't have an NFT, redirect them to the login page
  if (!hasNft) {
    console.log("User", user.address, "doesn't have an NFT! Redirecting...");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Finally, return the props
  return {
    props: {},
  };
}
