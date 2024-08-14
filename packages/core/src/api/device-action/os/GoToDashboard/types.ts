import { GlobalCommandErrorStatusCode } from "@api/command/utils/GlobalCommandError";
import { DeviceActionState } from "@api/device-action/model/DeviceActionState";
import { UserInteractionRequired } from "@api/device-action/model/UserInteractionRequired";
import { UnknownDAError } from "@api/device-action/os/Errors";
import {
  GetDeviceStatusDAError,
  GetDeviceStatusDAInput,
  GetDeviceStatusDAIntermediateValue,
} from "@api/device-action/os/GetDeviceStatus/types";
import { DeviceExchangeError, SdkError } from "@api/Error";

export type GoToDashboardDAOutput = void;
export type GoToDashboardDAInput = GetDeviceStatusDAInput;

export type GoToDashboardDAError =
  | GetDeviceStatusDAError
  | UnknownDAError
  | DeviceExchangeError<GlobalCommandErrorStatusCode>
  | SdkError; /// TODO: remove, we should have an exhaustive list of errors

export type GoToDashboardDARequiredInteraction = UserInteractionRequired.None;

export type GoToDashboardDAIntermediateValue =
  | GetDeviceStatusDAIntermediateValue
  | {
      readonly requiredUserInteraction: GoToDashboardDARequiredInteraction;
    };

export type GoToDashboardDAState = DeviceActionState<
  GoToDashboardDAOutput,
  GoToDashboardDAError,
  GoToDashboardDAIntermediateValue
>;
