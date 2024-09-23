import { createContext, useContext, useEffect, useState } from "react";
import {
  BuiltinTransports,
  ConsoleLogger,
  DeviceSdk,
  DeviceSdkBuilder,
} from "@ledgerhq/device-management-kit";
import { useSdkConfigContext } from "../SdkConfig";

const defaultSdk = new DeviceSdkBuilder()
  .addLogger(new ConsoleLogger())
  .addTransport(BuiltinTransports.BLE)
  .build();

const SdkContext = createContext<DeviceSdk>(defaultSdk);

type Props = {
  children: React.ReactNode;
};

export const SdkProvider: React.FC<Props> = ({ children }) => {
  const {
    state: { transport, mockServerUrl },
  } = useSdkConfigContext();
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
    } else {
      sdk.close();
      setSdk(
        new DeviceSdkBuilder()
          .addLogger(new ConsoleLogger())
          .addTransport(transport)
          .build(),
      );
    }
  }, [transport, mockServerUrl]);

  if (sdk) {
    return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
  }
  return null;
};

export const useSdk = (): DeviceSdk => {
  return useContext(SdkContext);
};
