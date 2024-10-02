import { createContext, useContext, useEffect, useState } from "react";
import {
  BuiltinTransports,
  ConsoleLogger,
  DeviceSdk,
  DeviceSdkBuilder,
} from "@ledgerhq/device-management-kit";
import { useSdkConfigContext } from "../SdkConfig";
import { usePrevious } from "@/hooks/usePrevious";

const defaultSdk = new DeviceSdkBuilder()
  .addLogger(new ConsoleLogger())
  .addTransport(BuiltinTransports.BLE)
  .addTransport(BuiltinTransports.USB)
  .build();

const SdkContext = createContext<DeviceSdk>(defaultSdk);

type Props = {
  children: React.ReactNode;
};

export const SdkProvider: React.FC<Props> = ({ children }) => {
  const {
    state: { transport, mockServerUrl },
  } = useSdkConfigContext();
  const previousTransport = usePrevious(transport);
  const [sdk, setSdk] = useState<DeviceSdk>(defaultSdk);
  useEffect(() => {
    if (transport === BuiltinTransports.MOCK_SERVER) {
      sdk.close();
      setSdk(
        new DeviceSdkBuilder()
          .addLogger(new ConsoleLogger())
          .addTransport(BuiltinTransports.MOCK_SERVER)
          .addConfig({ mockUrl: mockServerUrl })
          .build(),
      );
    } else if (previousTransport === BuiltinTransports.MOCK_SERVER) {
      sdk.close();
      setSdk(
        new DeviceSdkBuilder()
          .addLogger(new ConsoleLogger())
          .addTransport(BuiltinTransports.BLE)
          .addTransport(BuiltinTransports.USB)
          .build(),
      );
    }
  }, [transport, mockServerUrl, previousTransport]);

  if (sdk) {
    return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
  }
  return null;
};

export const useSdk = (): DeviceSdk => {
  return useContext(SdkContext);
};
