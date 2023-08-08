/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Box, ThemeProvider, jsx } from "theme-ui";
import { ManagedUIContext, useUI } from "@components/common/context";
import Head from "@components/common/Head";
import { CommerceProvider } from "@lib/shopify/storefront-data-hooks";
import shopifyConfig from "@config/shopify";
import { BuilderContent } from "@builder.io/react";
import themesMap from "@config/theme";
import seoConfig from "@config/seo.json";

const Layout: React.FC<{ pageProps: any; children: React.ReactNode }> = ({ children, pageProps }) => {
  const builderTheme = pageProps.theme;
  return (
    <CommerceProvider {...shopifyConfig}>
      <BuilderContent isStatic content={builderTheme} modelName="theme">
        {(data, loading) => {
          if (loading && !builderTheme) {
            return <Box sx={{ height: "100vh", display: "flex" }}></Box>;
          }
          const siteSettings = data?.siteSettings;
          const colorOverrides = data?.colorOverrides;
          const siteSeoInfo = data?.siteInformation;
          return (
            <ManagedUIContext key={data?.id} siteSettings={siteSettings}>
              <Head seoInfo={siteSeoInfo || seoConfig} />
              <InnerLayout themeName={data?.theme} colorOverrides={colorOverrides}>
                {children}
              </InnerLayout>
            </ManagedUIContext>
          );
        }}
      </BuilderContent>
    </CommerceProvider>
  );
};

const InnerLayout: React.FC<{
  themeName: string;
  children: React.ReactNode;
  colorOverrides?: {
    text?: string;
    background?: string;
    primary?: string;
    secondary?: string;
    muted?: string;
  };
}> = ({ themeName, children, colorOverrides }) => {
  const theme = {
    ...themesMap[themeName],
    colors: {
      ...themesMap[themeName].colors,
      ...colorOverrides,
    },
  };
  const { displaySidebar, closeSidebar } = useUI();
  // const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  return (
    <ThemeProvider theme={theme}>
      <div
        sx={{
          margin: `0 auto`,
          px: 20,
          maxWidth: 1920,
          minWidth: "60vw",
          minHeight: 800,
        }}
      >
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
