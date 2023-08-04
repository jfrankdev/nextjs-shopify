import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { builder } from '@builder.io/react'
import '@builder.io/widgets'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
// import type { AppProps } from "next/app";
// import Layout from "@components/common/Layout";
// import { builder, Builder } from "@builder.io/react";
// import builderConfig from "@config/builder";
// builder.init(builderConfig.apiKey);

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Layout pageProps={pageProps}>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }
