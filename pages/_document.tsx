import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script id="google-tag-manager" strategy="worker">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MBZQQTS');
        `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M554GRGBNJ" strategy="worker" />
        <Script id="google-analytics" strategy="worker">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-M554GRGBNJ');
        `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
