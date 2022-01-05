interface LocationDescriptor {
  name: string;
  path: string;
  rawPath: string;
  hash: string;
  query: Record<string, any>;
  params: Record<string, any>;
}

type HistoryLocation = string | Partial<LocationDescriptor>;

interface HistoryHelper {
  getLocation(): LocationDescriptor;
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
