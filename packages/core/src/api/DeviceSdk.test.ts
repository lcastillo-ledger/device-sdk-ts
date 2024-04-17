import { LocalConfigDataSource } from "@internal/config/data/ConfigDataSource";
import { StubLocalConfigDataSource } from "@internal/config/data/LocalConfigDataSource.stub";
import { configTypes } from "@internal/config/di/configTypes";
import { discoveryTypes } from "@internal/discovery/di/discoveryTypes";
import { sendTypes } from "@internal/send/di/sendTypes";
import { usbDiTypes } from "@internal/usb/di/usbDiTypes";
import pkg from "@root/package.json";
import { StubUseCase } from "@root/src/di.stub";

import { commandTypes } from "./command/di/commandTypes";
import { ConsoleLogger } from "./logger-subscriber/service/ConsoleLogger";
import { DeviceSdk } from "./DeviceSdk";

jest.mock("./logger-subscriber/service/ConsoleLogger");

let sdk: DeviceSdk;
let logger: ConsoleLogger;
describe("DeviceSdk", () => {
  describe("clean", () => {
    beforeEach(() => {
      logger = new ConsoleLogger();
      sdk = new DeviceSdk({ stub: false, loggers: [logger] });
    });

    it("should create an instance", () => {
      expect(sdk).toBeDefined();
      expect(sdk).toBeInstanceOf(DeviceSdk);
    });

    it("should return a clean `version`", async () => {
      expect(await sdk.getVersion()).toBe(pkg.version);
    });

    it("should have startDiscovery method", () => {
      expect(sdk.startDiscovering).toBeDefined();
    });

    it("should have stopDiscovery method", () => {
      expect(sdk.stopDiscovering).toBeDefined();
    });

    it("should have connect method", () => {
      expect(sdk.connect).toBeDefined();
    });

    it("should have sendApdu method", () => {
      expect(sdk.sendApdu).toBeDefined();
    });

    it("should have getConnectedDevice method", () => {
      expect(sdk.getConnectedDevice).toBeDefined();
    });

    it("should have sendCommand method", () => {
      expect(sdk.sendCommand).toBeDefined();
    });
  });

  describe("stubbed", () => {
    beforeEach(() => {
      sdk = new DeviceSdk({ stub: true, loggers: [] });
    });

    it("should create a stubbed sdk", () => {
      expect(sdk).toBeDefined();
      expect(sdk).toBeInstanceOf(DeviceSdk);
    });

    it("should return a stubbed config", () => {
      expect(
        sdk.container.get<LocalConfigDataSource>(
          configTypes.LocalConfigDataSource,
        ),
      ).toBeInstanceOf(StubLocalConfigDataSource);
    });

    it("should return a stubbed version", async () => {
      expect(await sdk.getVersion()).toBe("0.0.0-stub.1");
    });

    it.each([
      [discoveryTypes.StartDiscoveringUseCase],
      [discoveryTypes.StopDiscoveringUseCase],
      [discoveryTypes.ConnectUseCase],
      [sendTypes.SendApduUseCase],
      [commandTypes.SendCommandUseCase],
      [usbDiTypes.GetConnectedDeviceUseCase],
    ])("should have %p use case", (diSymbol) => {
      const uc = sdk.container.get<StubUseCase>(diSymbol);
      expect(uc).toBeInstanceOf(StubUseCase);
      expect(uc.execute()).toBe("stub");
    });
  });

  describe("without args", () => {
    beforeEach(() => {
      sdk = new DeviceSdk();
    });

    it("should create an instance", () => {
      expect(sdk).toBeDefined();
      expect(sdk).toBeInstanceOf(DeviceSdk);
    });

    it("should return a clean `version`", async () => {
      expect(await sdk.getVersion()).toBe(pkg.version);
    });
  });
});
