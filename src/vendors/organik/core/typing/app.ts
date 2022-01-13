interface LocationDescriptor {
  name: string;
  path: string;
  hash: string;
  query: Record<string, any>;
  params: Record<string, any>;
}

type HistoryLocation = string | Partial<LocationDescriptor>;

interface LocationRoute extends LocationDescriptor {
  rawPath: string;
  ancestors: Pick<LocationRoute, 'name'>[];
}

interface HistoryHelper {
  getLocation(): LocationRoute;
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

export { LocationDescriptor, HistoryLocation, LocationRoute, AppHelper };
