"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Flex, IconsLegacy, Link, Text } from "@ledgerhq/react-ui";
import { useRouter } from "next/navigation";
import styled, { DefaultTheme } from "styled-components";

import { AvailableDevices } from "@/components/AvailableDevices";
import { Device } from "@/components/Device";
import { Menu } from "@/components/Menu";
import { useExportLogsCallback, useSdk } from "@/providers/DeviceSdkProvider";
import { useDeviceSessionsContext } from "@/providers/DeviceSessionsProvider";

const Root = styled(Flex).attrs({ py: 8, px: 6 })`
  flex-direction: column;
  width: 280px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background.drawer};
`;

const Subtitle = styled(Text).attrs({ mb: 5 })``;

const MenuContainer = styled(Box)`
  flex: 1;
  opacity: ${({ active }: { active: boolean }) => (active ? 1 : 0.5)};
`;

const BottomContainer = styled(Flex)`
  opacity: 0.5;
  flex-direction: column;
  align-items: center;
`;

const VersionText = styled(Text)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral.c50};
`;

export const Sidebar: React.FC = () => {
  const [version, setVersion] = useState("");
  const sdk = useSdk();
  const exportLogs = useExportLogsCallback();
  const {
    state: { deviceById, selectedId },
    dispatch,
  } = useDeviceSessionsContext();

  useEffect(() => {
    sdk
      .getVersion()
      .then((v) => setVersion(v))
      .catch((error: unknown) => {
        console.error(new Error(String(error)));
        setVersion("");
      });
  }, [sdk]);
  const onDeviceDisconnect = useCallback(
    async (sessionId: string) => {
      try {
        await sdk.disconnect({ sessionId });
        dispatch({ type: "remove_session", payload: { sessionId } });
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, sdk],
  );

  const router = useRouter();
  return (
    <Root>
      <Link
        onClick={() => router.push("/")}
        mb={8}
        textProps={{
          textAlign: "left",
          variant: "large",
        }}
      >
        Ledger Device Management Kit
      </Link>

      <Subtitle variant={"tiny"}>Connected Devices</Subtitle>

      {Object.entries(deviceById).map(([sessionId, device]) => (
        <Device
          key={sessionId}
          sessionId={sessionId}
          name={device.name}
          model={device.modelId}
          type={device.type}
          onDisconnect={async () => onDeviceDisconnect(sessionId)}
        />
      ))}

      <AvailableDevices />

      <MenuContainer active={!!selectedId}>
        <Subtitle variant={"tiny"}>Menu</Subtitle>
        <Menu />
      </MenuContainer>

      <BottomContainer>
        <Link
          mb={6}
          onClick={exportLogs}
          size="large"
          Icon={IconsLegacy.ExternalLinkMedium}
        >
          Share logs
        </Link>
        <VersionText variant={"body"} whiteSpace="pre" textAlign="center">
          Ledger Device Management Kit{"\n"}version {version}
        </VersionText>
      </BottomContainer>
    </Root>
  );
};
