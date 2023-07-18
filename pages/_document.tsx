import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M554GRGBNJ"
          strategy="worker"
        />
        <Script id="google-analytics" strategy="worker">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-M554GRGBNJ');
        `}
        </Script>
        {/* Begin: Northbeam pixel */}
        <Script
          src="//j.northbeam.io/ota-sp/33aa0d9c-88df-4135-9853-0348fa592ae9.js"
          strategy="afterInteractive"
        />
        {/* End: Northbeam pixel */}

        {/* TikTok Analytics */}
        <Script id="ttq-script" strategy="afterInteractive">
          {`!(function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = (w[t] = w[t] || []);
              ttq.methods = [
                "page",
                "track",
                "identify",
                "instances",
                "debug",
                "on",
                "off",
                "once",
                "ready",
                "alias",
                "group",
                "enableCookie",
                "disableCookie",
              ];
              ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
              };
              for (var i = 0; i < ttq.methods.length; i++)
                ttq.setAndDefer(ttq, ttq.methods[i]);
              ttq.instance = function (t) {
                for (
                  var e = ttq._i[t] || [], n = 0;
                  n < ttq.methods.length;
                  n++
                )
                  ttq.setAndDefer(e, ttq.methods[n]);
                return e;
              };
              ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = i;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date();
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript";
                o.async = true;
                o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a);
              };

              ttq.load("C7NE8BKD81EIAPSD6EM0");
              ttq.page();
            })(window, document, "ttq");`}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-script" strategy="afterInteractive">
          {`!(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod
                  ? n.callMethod.apply(n, arguments)
                  : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = "2.0";
              n.queue = [];
              t = b.createElement(e);
              t.async = true;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(
              window,
              document,
              "script",
              "https://connect.facebook.net/en_US/fbevents.js"
            );
            fbq("init", "928701198571455");
            fbq("track", "PageView");`}
        </Script>

        <noscript>
          <Image
            alt="Facebook Pixel"
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=928701198571455&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
