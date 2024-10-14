import React, { useCallback, useState } from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import {
  ConsoleLogger,
  DeviceSdk,
  DeviceSdkBuilder,
  WebLogsExporterLogger,
} from "@ledgerhq/device-management-kit";

const SdkContext = createContext<DeviceSdk | null>(null);
const LogsExporterContext = createContext<WebLogsExporterLogger | null>(null);

export const SdkProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(() => {
    const logsExporter = new WebLogsExporterLogger();
    const sdk = new DeviceSdkBuilder()
      .addLogger(new ConsoleLogger())
      .addLogger(logsExporter)
      .build();
    return { sdk, logsExporter };
  });

  return (
    <SdkContext.Provider value={state.sdk}>
      <LogsExporterContext.Provider value={state.logsExporter}>
        {children}
      </LogsExporterContext.Provider>
    </SdkContext.Provider>
  );
};

export const useSdk = (): DeviceSdk => {
  const sdk = useContext(SdkContext);
  if (sdk === null)
    throw new Error("useSdk must be used within a SdkContext.Provider");
  return sdk;
};

export function useExportLogsCallback() {
  const logsExporter = useContext(LogsExporterContext);
  if (logsExporter === null) {
    throw new Error(
      "useExportLogsCallback must be used within LogsExporterContext.Provider",
    );
  }
  return useCallback(() => {
    logsExporter.exportLogsToJSON();
  }, [logsExporter]);
}
