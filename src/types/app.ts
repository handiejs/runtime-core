import {
  ComponentCtor,
  ComponentDescriptor,
  ActionDescriptor,
  ModuleDescriptor,
} from '../vendors/organik';

import { ThemeOptions } from './theme';

type MountEl = Element | string;

interface AppDescriptor {
  components?: ComponentDescriptor[]; // includes controls and widgets
  metadata?: {
    actions?: ActionDescriptor[];
    modules?: ModuleDescriptor[];
  };
  theme?: ThemeOptions;
  root?: ComponentCtor;
  el?: MountEl;
}

interface AppInstance {
  mount(el?: MountEl): void;
}

export { AppDescriptor, AppInstance };
