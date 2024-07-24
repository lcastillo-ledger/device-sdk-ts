import { InternalApi } from "@api/device-action/DeviceAction";

const sendCommandMock = jest.fn();
const apiGetDeviceSessionStateMock = jest.fn();
const apiGetDeviceSessionStateObservableMock = jest.fn();
const setDeviceSessionStateMock = jest.fn();
const managerApiServiceMock = { getAppsByHash: jest.fn() };

export function makeInternalApiMock(): jest.Mocked<InternalApi> {
  return {
    sendCommand: sendCommandMock,
    getDeviceSessionState: apiGetDeviceSessionStateMock,
    getDeviceSessionStateObservable: apiGetDeviceSessionStateObservableMock,
    setDeviceSessionState: setDeviceSessionStateMock,
    managerApiService: managerApiServiceMock,
  };
}
