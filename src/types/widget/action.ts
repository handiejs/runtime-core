import { ClientAction } from '../../vendors/organik';

import { BaseWidgetConfig, BaseWidgetState } from './base';

interface ActionWidgetConfig extends BaseWidgetConfig {
  readonly icon?: string;
  readonly iconOnly?: boolean;
  readonly showIcon?: boolean;
  readonly disableWhenNoSelection?: boolean;
}

interface IActionWidget<CT extends ActionWidgetConfig = ActionWidgetConfig> {
  readonly action: ClientAction<CT>;
}

interface ActionWidgetState extends BaseWidgetState {
  disabled: boolean;
}

export { ActionWidgetConfig, IActionWidget, ActionWidgetState };
