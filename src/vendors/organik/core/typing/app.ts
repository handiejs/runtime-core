import { DialogShortcutMethod } from 'petals-ui/dist/dialog';
import { MessageShortcutMethod } from 'petals-ui/dist/message';

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
  // dialog shortcuts
  alert: DialogShortcutMethod;
  confirm: DialogShortcutMethod;
  // message shortcuts
  success: MessageShortcutMethod;
  error: MessageShortcutMethod;
  warning: MessageShortcutMethod;
  info: MessageShortcutMethod;
}

export { LocationDescriptor, HistoryLocation, LocationRoute, AppHelper };
