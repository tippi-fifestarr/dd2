import Head from "next/head";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const Meta = () => (
  // const Head = ({ title, desc, canonical, image, props }) => (

  <>
    <Head>
      <title>DDEUX Access Page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Deduce their DaDeuce, and you can too!"
      />
      <meta
        name="keywords"
        content="DaDeuce, Thirdweb, Web3, NFT, DAO, DeDeux"
      />
      <meta name="author" content="Tippi Fifestarr" />
    </Head>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${GA_ID}');
    `}
    </Script>
  </>
);
export default Meta;
