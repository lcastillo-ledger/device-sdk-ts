import { Container } from "inversify";

import { types as ConfigTypes } from "@internal/config/di/configTypes";
import { GetSdkVersionUseCase } from "@internal/config/usecase/GetSdkVersionUseCase";
import { makeContainer, MakeContainerProps } from "@root/src/di";

export class DeviceSdk {
  container: Container;
  /** @internal */
  constructor({ stub, loggers }: MakeContainerProps) {
    // NOTE: MakeContainerProps might not be the exact type here
    // For the init of the project this is sufficient, but we might need to
    // update the constructor arguments as we go (we might have more than just the container config)
    this.container = makeContainer({ stub, loggers });
  }

  startScan() {
    return;
  }

  stopScan() {
    return;
  }

  getVersion(): Promise<string> {
    return this.container
      .get<GetSdkVersionUseCase>(ConfigTypes.GetSdkVersionUseCase)
      .getSdkVersion();
  }
}
