import {
  ComponentCtor,
  ComponentDescriptor,
  AppHelper,
  ActionDescriptor,
  ModuleDescriptor,
} from '../vendors/organik';

import { ThemeOptions } from './theme';

type MountEl = Element | string;

type AppHelperCreator = () => AppHelper;

interface AppCreators {
  appHelper?: AppHelperCreator;
}

interface AppDescriptor {
  components?: ComponentDescriptor[]; // includes controls and widgets
  metadata?: {
    actions?: ActionDescriptor[];
    modules?: ModuleDescriptor[];
  };
  creators?: AppCreators;
  theme?: ThemeOptions;
  root?: ComponentCtor;
  el?: MountEl;
}

interface AppInstance {
  mount(el?: MountEl): void;
}

export { AppCreators, AppDescriptor, AppInstance };
