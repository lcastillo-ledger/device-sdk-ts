import { inject, injectable } from "inversify";
import { map, Observable } from "rxjs";

import { DeviceModel } from "@api/device/DeviceModel";
import { DiscoveredDevice } from "@api/types";
import { usbDiTypes } from "@internal/usb/di/usbDiTypes";
import { InternalDiscoveredDevice } from "@internal/usb/model/InternalDiscoveredDevice";
import type { UsbHidTransport } from "@internal/usb/transport/UsbHidTransport";

/**
 * Listen to list of known discovered devices (and later BLE).
 */
@injectable()
export class ListenToKnownDevicesUseCase {
  constructor(
    @inject(usbDiTypes.UsbHidTransport)
    private usbHidTransport: UsbHidTransport,
    // Later: @inject(usbDiTypes.BleTransport) private bleTransport: BleTransport,
  ) {}

  execute(): Observable<DiscoveredDevice[]> {
    return this.usbHidTransport.listenToKnownDevices().pipe(
      map((discoveredDevices: InternalDiscoveredDevice[]) => {
        return discoveredDevices.map(
          (discoveredDevice: InternalDiscoveredDevice) => {
            const deviceModel = new DeviceModel({
              id: discoveredDevice.id,
              model: discoveredDevice.deviceModel.id,
              name: discoveredDevice.deviceModel.productName,
            });
            return {
              id: discoveredDevice.id,
              deviceModel,
              // TODO: add "connected: boolean" property
              // TODO: add "connectionType" property
            };
          },
        );
      }),
    );
  }
}
