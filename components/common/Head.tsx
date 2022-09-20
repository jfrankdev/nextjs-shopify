import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
const Head: FC<{ seoInfo: any }> = (props) => {

  return (
    <>
      <DefaultSeo {...props.seoInfo} />

      <NextHead>
        <title>Make The Switch</title>
        <meta name="og:title" content="Make The Switch" />
        <meta
          name="description"
          content="THE WALLET, REDEFINED. There’s a better way to carry cash and cards — we invented it. Slim, RFID-Blocking wallets that are guaranteed for life."
        />
        <meta
          property="og:image"
          content="https://cdn.shopify.com/s/files/1/0613/6213/files/LOGO-SQUARE3_9a388b7b-1279-4887-807a-10e1595cf041.jpg?v=1613512108"
        />
        <meta
          property="og:description"
          content="THE WALLET, REDEFINED. There’s a better way to carry cash and cards — we invented it. Slim, RFID-Blocking wallets that are guaranteed for life."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link rel="icon" type="image/png" href="ridge_favicon_logo.png" />
        
        </NextHead>

    </>
  )
}

export default Head
