/* eslint-disable no-restricted-imports */
import { expect, test } from "@playwright/test";

import { thenDeviceIsConnected } from "../utils/thenHandlers";
import { getLastDeviceResponseContent } from "../utils/utils";
import {
  whenClickingCTACommand,
  whenConnectingDevice,
  whenExecute,
  whenExecuteDeviceAction,
  whenNavigateTo,
} from "../utils/whenHandlers";

interface GetAddressResponse {
  status: string;
  output: {
    publicKey: string;
    address: string;
  };
  error?: object;
}

test.describe("ETH Signer: get address, unhappy paths", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("device should return error if pub key is malformed", async ({
    page,
  }) => {
    await test.step("Given first device is connected", async () => {
      // When we connect the device
      await whenConnectingDevice(page);

      // Then verify the device is connected
      await thenDeviceIsConnected(page, 0);
    });

    await test.step("Then execute ETH: get address with malformed derivation paths", async () => {
      await whenNavigateTo(page, "/keyring");

      await whenClickingCTACommand(page, "Ethereum");

      await whenExecuteDeviceAction(page, "Get address", {
        inputField: "input_derivationPath",
        inputValue: "aa'/60'/0'/0/0",
      });

      await page.waitForTimeout(1000);

      //then verify it errors
      expect(
        ((await getLastDeviceResponseContent(page)) as GetAddressResponse)
          .status,
      ).toBe("error");

      await whenExecute("device-action")(page, "Get address", {
        inputField: "input_derivationPath",
        inputValue: "44'/aa'/0'/0/0",
      });

      await page.waitForTimeout(1000);

      //then verify it errors
      expect(
        ((await getLastDeviceResponseContent(page)) as GetAddressResponse)
          .status,
      ).toBe("error");

      await whenExecute("device-action")(page, "Get address", {
        inputField: "input_derivationPath",
        inputValue: "44'/60'/aa'/0/0",
      });

      await page.waitForTimeout(1000);

      //then verify it errors
      expect(
        ((await getLastDeviceResponseContent(page)) as GetAddressResponse)
          .status,
      ).toBe("error");

      await whenExecute("device-action")(page, "Get address", {
        inputField: "input_derivationPath",
        inputValue: "44'/60'/0'/aa/0",
      });

      await page.waitForTimeout(1000);

      //then verify it errors
      expect(
        ((await getLastDeviceResponseContent(page)) as GetAddressResponse)
          .status,
      ).toBe("error");

      await whenExecute("device-action")(page, "Get address", {
        inputField: "input_derivationPath",
        inputValue: "44'/60'/0'/0/aa",
      });

      await page.waitForTimeout(1000);

      //then verify it errors
      expect(
        ((await getLastDeviceResponseContent(page)) as GetAddressResponse)
          .status,
      ).toBe("error");
    });
  });
});
