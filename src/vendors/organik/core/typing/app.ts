interface LocationDescriptor {
  name?: string;
  path?: string;
  hash?: string;
  query?: Record<string, any>;
  params?: Record<string, any>;
}

type HistoryLocation = string | LocationDescriptor;

interface HistoryHelper {
  back(): void;
  forward(): void;
  go(delta?: number): void;
  push(location: HistoryLocation): any;
  replace(location: HistoryLocation): any;
}

interface AppHelper {
  readonly history: HistoryHelper;
  alert(message: string, callback?: () => any): void;
  confirm(message: string, ...args: any[]): void;
}

export { LocationDescriptor, HistoryLocation, AppHelper };
