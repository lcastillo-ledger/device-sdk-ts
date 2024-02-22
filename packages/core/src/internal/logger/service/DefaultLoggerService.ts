import { injectable } from "inversify";

import { LoggerSubscriber, LogLevel,LogOptions } from "./Log";
import { LoggerService } from "./LoggerService";

@injectable()
export class DefaultLoggerService implements LoggerService {
  subscribers: LoggerSubscriber[];
  constructor(subscribers: LoggerSubscriber[]) {
    this.subscribers = subscribers;
  }

  _log(level: LogLevel, message: string, options?: LogOptions): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.log(level, message, options);
    });
  }

  info(message: string, options?: LogOptions): void {
    this._log(LogLevel.Info, message, options);
  }

  warn(message: string, options?: LogOptions): void {
    this._log(LogLevel.Warning, message, options);
  }

  debug(message: string, options?: LogOptions): void {
    this._log(LogLevel.Debug, message, options);
  }

  error(message: string, options?: LogOptions): void {
    this._log(LogLevel.Error, message, options);
  }
}
