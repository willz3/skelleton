import { IDomainEvent } from './domain-events.interface';

export class DomainEvents {
  private static handlersMap = {};

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string,
  ): void {
    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      this.handlersMap[eventClassName].push(callback);
    } else {
      this.handlersMap[eventClassName] = [];
      this.handlersMap[eventClassName].push(callback);
    }
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}
