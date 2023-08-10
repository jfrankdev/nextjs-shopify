import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script id="northbeam" strategy="afterInteractive">
          {`
            if(window.location.href.includes('intl-') || window.location.href.includes('au-') || window.location.href.includes('ca-') || window.location.href.includes('eu-') || window.location.href.includes('uk-')){
              console.log("Northbeam: THIS IS INTL STORE");
              (function(){var r;(e=r=r||{}).A="identify",e.B="trackPageView",e.C="fireEmailCaptureEvent",e.D="fireCustomGoal",e.E="firePurchaseEvent";var e="//j.northbeam.io/ota-sp/e58721ea-c5d5-4f3d-b281-8b69c9e5fefa.js";function t(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];a.push({fnName:e,args:n})}var a=[],n=((n={_q:a})[r.A]=function(e,n){return t(r.A,e,n)},n[r.B]=function(){return t(r.B)},n[r.C]=function(e,n){return t(r.C,e,n)},n[r.D]=function(e,n){return t(r.D,e,n)},n[r.E]=function(e){return t(r.E,e)},window.Northbeam=n,document.createElement("script"));n.async=!0,n.src=e,document.head.appendChild(n);})()
            } else {
              console.log("Northbeam: THIS IS NOT INTL STORE");
              (function(){var r;(n=r=r||{}).A="identify",n.B="trackPageView",n.C="fireEmailCaptureEvent",n.D="fireCustomGoal",n.E="firePurchaseEvent";var n="//j.northbeam.io/ota-sp/33aa0d9c-88df-4135-9853-0348fa592ae9.js";function t(n){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];a.push({fnName:n,args:e})}var a=[],e=((e={_q:a})[r.A]=function(n,e){return t(r.A,n,e)},e[r.B]=function(){return t(r.B)},e[r.C]=function(n,e){return t(r.C,n,e)},e[r.D]=function(n,e){return t(r.D,n,e)},e[r.E]=function(n){return t(r.E,n)},window.Northbeam=e,document.createElement("script"));e.async=!0,e.src=n,document.head.appendChild(e);})()
            }
          `}
        </Script>
        <Script id="google-tag-manager" strategy="worker">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MBZQQTS');
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
