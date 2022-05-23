import { ClientAction, ViewContext, getAppHelper } from '../../vendors/organik';

import { ActionWidgetConfig, IActionWidget } from '../../types/widget/action';
import { isString } from '../../utils';
import { BaseHeadlessWidget } from '../base';

class ActionHeadlessWidget<
  CT extends ActionWidgetConfig = ActionWidgetConfig
> extends BaseHeadlessWidget<IActionWidget<CT>, CT> {
  private getAction(): ClientAction<CT> {
    return this.getProp('action');
  }

  public getConfig(): CT {
    return this.getAction().config || ({} as CT);
  }

  /**
   * Execute client action with view context
   *
   * @param viewContext injected view context
   */
  public execute(viewContext: ViewContext): void {
    const appHelper = getAppHelper();
    const { danger, confirm, text, execute } = this.getAction();

    let beforeExecute: ((callback: () => Promise<void>) => void) | undefined;
    let needConfirm: boolean;

    if (danger) {
      needConfirm = confirm !== false;
    } else {
      needConfirm = !!confirm;
    }

    if (needConfirm) {
      beforeExecute = callback =>
        appHelper.confirm(
          isString(confirm) ? (confirm as string) : `确定要${text || '执行此操作'}？`,
          {
            title: '提示',
            type: 'warning',
            affirmButton: callback,
          },
        );
    }

    const executeAction = async () => {
      if (execute) {
        await Promise.resolve(execute(viewContext, appHelper, this.getConfig()));
      }
    };

    if (beforeExecute) {
      beforeExecute(executeAction);
    } else {
      executeAction();
    }
  }

  /**
   * Render content of action widget
   *
   * @param iconWithTextRenderer render `Icon` component and text
   * @returns content of action widget
   */
  public renderContent<NodeType>(
    iconWithTextRenderer: (iconRef: string, text: string, iconOnly: boolean) => NodeType[],
  ): NodeType[] | string {
    const text = this.getAction().text || '';

    let { showIcon, iconOnly, icon } = this.getConfig();

    if (showIcon === undefined) {
      showIcon = this.getCommonBehavior('action.showIcon');
    }

    if (iconOnly === undefined) {
      iconOnly = this.getCommonBehavior('action.iconOnly');
    }

    return !showIcon || !icon ? text : iconWithTextRenderer(icon, text, iconOnly!);
  }
}

export { ActionHeadlessWidget };
