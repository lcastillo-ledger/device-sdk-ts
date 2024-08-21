import { ContextModule } from "@ledgerhq/context-module";
import {
  InternalApi,
  OpenAppDAError,
  OpenAppDARequiredInteraction,
  SdkError,
  UserInteractionRequired,
  XStateDeviceAction,
} from "@ledgerhq/device-sdk-core";
import { StateMachineTypes } from "xstate";

import { Signature } from "@api/model/Signature";
import { GetChallengeCommand } from "@internal/app-binder/command/GetChallengeCommand";

type SignTransactionDAOutput = Signature;
type SignTransactionDAInput = {
  derivationPath: string;
  transaction: string;
  challenge: string;
  contextModule: ContextModule;
};
type SignTransactionDAError = OpenAppDAError | SdkError;
type SignTransactionDAIntermediateValue = {
  requiredUserInteraction:
    | OpenAppDARequiredInteraction
    | UserInteractionRequired.SignTransaction;
};
type SignTransactionDAInternalState = {
  readonly error: OpenAppDAError | null;
  readonly Signature: Signature | null;
};

export class SignTransactionDeviceAction extends XStateDeviceAction<
  SignTransactionDAOutput,
  SignTransactionDAInput,
  SignTransactionDAError,
  SignTransactionDAIntermediateValue,
  SignTransactionDAInternalState
> {
  makeStateMachine(internalApi: InternalApi) {
    type types = StateMachineTypes<
      SignTransactionDAOutput,
      SignTransactionDAInput,
      SignTransactionDAError,
      SignTransactionDAIntermediateValue,
      SignTransactionDAInternalState
    >;
    const {} = this.extractDependencies(internalApi);
  }

  extractDependencies(internalApi: InternalApi) {
    const getChallenge = async () =>
      internalApi.sendCommand(new GetChallengeCommand());
    const getContexts =
  }
}
