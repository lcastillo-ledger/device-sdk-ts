/**
 * src/app/client-layout.tsx
 *
 * Root layout component for client-side rendering.
 *
 * Utilizes StyleProvider from @ledgerhq/react-ui,
 * GlobalStyle from "@/styles/globalstyles" and local fonts
 * for styling the client-side application.
 */
"use client";

import React, { PropsWithChildren } from "react";
import { Flex, StyleProvider } from "@ledgerhq/react-ui";
import styled, { DefaultTheme } from "styled-components";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SdkProvider } from "@/providers/DeviceSdkProvider";
import { DeviceSessionsProvider } from "@/providers/DeviceSessionsProvider";
import { GlobalStyle } from "@/styles/globalstyles";

const Root = styled(Flex)`
  flex-direction: row;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral.c90};
  height: 100%;
  flex: 1;
`;

const PageContainer = styled(Flex)`
  flex-direction: column;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background.main};
  flex: 1;
`;

const ClientRootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <SdkProvider>
        <StyleProvider selectedPalette="dark" fontsPath="/fonts">
          <GlobalStyle />
          <body>
            <Root>
              <DeviceSessionsProvider>
                <Sidebar />
                <PageContainer>
                  <Header />
                  {children}
                </PageContainer>
              </DeviceSessionsProvider>
            </Root>
          </body>
        </StyleProvider>
      </SdkProvider>
    </html>
  );
};

export default ClientRootLayout;
