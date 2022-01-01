import { ClientAction } from '../../vendors/organik';

interface ActionWidgetConfig {
  readonly icon?: string;
  readonly iconOnly?: boolean;
  readonly showIcon?: boolean;
}

interface IActionWidget<CT extends ActionWidgetConfig = ActionWidgetConfig> {
  readonly action: ClientAction<CT>;
}

interface ActionWidgetState {
  disabled: boolean;
}

export { ActionWidgetConfig, IActionWidget, ActionWidgetState };
