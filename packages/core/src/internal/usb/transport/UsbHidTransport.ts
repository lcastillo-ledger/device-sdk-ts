import { Either } from "purify-ts";
import { Observable } from "rxjs";

import { DeviceId } from "@api/device/DeviceModel";
import { SdkError } from "@api/Error";
import { ConnectError } from "@internal/usb/model/Errors";
import { InternalConnectedDevice } from "@internal/usb/model/InternalConnectedDevice";
import { InternalDiscoveredDevice } from "@internal/usb/model/InternalDiscoveredDevice";

export type DisconnectHandler = (deviceId: DeviceId) => void;

/**
 * Transport interface representing a USB HID communication
 */
export interface UsbHidTransport {
  isSupported(): boolean;

  startDiscovering(): Observable<InternalDiscoveredDevice>;

  stopDiscovering(): void;

  /**
   * Enables communication with the device by connecting to it.
   *
   * @param params containing
   *  - id: the device id from the DTO discovered device
   */
  connect(params: {
    deviceId: DeviceId;
    onDisconnect: DisconnectHandler;
  }): Promise<Either<ConnectError, InternalConnectedDevice>>;

  disconnect(params: {
    connectedDevice: InternalConnectedDevice;
  }): Promise<Either<SdkError, void>>;
}
