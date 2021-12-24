import { registerAndLoadIconProviders } from 'petals-ui/dist/icon';

import { registerComponent, registerAction, registerModules } from '../vendors/organik';

import { AppDescriptor, AppInstance } from '../types';
import { setDefaultTheme } from './theme';

function createApp({ components, metadata = {}, theme = {} }: AppDescriptor): AppInstance {
  if (components) {
    components.forEach(registerComponent);
  }

  const { actions, modules } = metadata;

  if (actions) {
    actions.forEach(action => registerAction(action));
  }

  if (modules) {
    registerModules(modules);
  }

  const { icon = {}, ...otherThemeOptions } = theme;

  if (icon.providers) {
    registerAndLoadIconProviders(icon.providers);
  }

  setDefaultTheme(otherThemeOptions, true);

  return {
    mount: (elementOrSelector: Element | string = '#app') => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  };
}

export { createApp };
