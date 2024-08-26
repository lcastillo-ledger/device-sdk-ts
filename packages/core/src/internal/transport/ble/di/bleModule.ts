import { ContainerModule } from "inversify";

import { UsbHidDeviceConnectionFactory } from "@internal/transport/usb/service/UsbHidDeviceConnectionFactory";

import { bleDiTypes } from "./bleDiTypes";

export const bleModuleFactory = () =>
  new ContainerModule((bind, _unbind, _isBound, _rebind) => {
    bind(bleDiTypes.BleDeviceConnectionFactory).to(
      UsbHidDeviceConnectionFactory,
    );
  });
