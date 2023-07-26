import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import cheerio from "cheerio";

/**
 * See this issue for more details https://github.com/emotion-js/emotion/issues/2040
 * Theme-ui using emotion which render styles inside template tags causing it not to apply when rendering
 * A/B test variations on the server, this fixes this issue by extracting those styles and appending them to body
 */
const extractABTestingStyles = (body: string) => {
  let globalStyles = "";

  if (body.includes("<template")) {
    const $ = cheerio.load(body);
    const templates = $("template");
    templates.toArray().forEach((element) => {
      const str = $(element).html();
      const styles = cheerio.load(String(str))("style");
      globalStyles += styles
        .toArray()
        .map((el) => $(el).html())
        .join(" ");
    });
  }
  return globalStyles;
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    let globalStyles = "";
    ctx.renderPage = async (options) => {
      const render = await originalRenderPage(options);
      globalStyles = extractABTestingStyles(render.html);
      return render;
    };
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      globalStyles,
    };
  }
  render() {
    return (
      <Html>
        <Head>
          {/* 
            Google Optimize Ant-Flicker Snippet
            https://support.google.com/optimize/answer/9692472?ref_topic=6197443
            https://stackoverflow.com/questions/63994663/general-problems-with-google-optimize-in-react-next-js
          */}
          <style
            dangerouslySetInnerHTML={{
              __html: `.async-hide { opacity: 0 !important}`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if(!(window.location.href.includes("nogtm"))){
                <!-- anti-flicker snippet (recommended)  -->
                (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
                h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
                (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
                })(window,document.documentElement,'async-hide','dataLayer',4000,
                {'${process.env.NEXT_PUBLIC_GTM}':true});
              }
            `,
            }}
          />
          {/* END - GOOGLE TAG MANAGER */}
        </Head>
        <body>
          <style
            dangerouslySetInnerHTML={{
              __html: (this.props as any).globalStyles,
            }}
          ></style>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
