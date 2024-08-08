import { OpenAppErrorCodes } from "@api/command/os/OpenAppCommand";
import { GlobalCommandErrorStatusCode } from "@api/command/utils/GlobalCommandError";
import { DeviceActionState } from "@api/device-action/model/DeviceActionState";
import { UserInteractionRequired } from "@api/device-action/model/UserInteractionRequired";
import {
  DeviceLockedError,
  DeviceNotOnboardedError,
} from "@api/device-action/os/Errors";
import { DeviceExchangeError, SdkError } from "@api/Error";

export type OpenAppDAOutput = void;

export type OpenAppDAInput = {
  readonly appName: string;
};

export type OpenAppDAError =
  | DeviceNotOnboardedError
  | DeviceLockedError
  | DeviceExchangeError<OpenAppErrorCodes | GlobalCommandErrorStatusCode>
  | SdkError;

type OpenAppDARequiredInteraction =
  | UserInteractionRequired.None
  | UserInteractionRequired.UnlockDevice
  | UserInteractionRequired.ConfirmOpenApp;

export type OpenAppDAIntermediateValue = {
  requiredUserInteraction: OpenAppDARequiredInteraction;
};

export type OpenAppDAState = DeviceActionState<
  OpenAppDAOutput,
  OpenAppDAError,
  OpenAppDAIntermediateValue
>;
