import { isString } from '@ntks/toolbox';

import {
  ClientAction,
  ViewContext,
  ComponentRenderer,
  ComponentCtor,
  ModuleContext,
  getAppHelper,
  isWidgetDependency,
  getWidget,
} from '../vendors/organik';

function resolveWidgetCtor(
  moduleContext: ModuleContext,
  widget: ComponentRenderer | undefined,
  widgetNameFromRenderTypeResolver: () => string,
): ComponentCtor | undefined {
  if (widget) {
    if (isString(widget)) {
      return isWidgetDependency(moduleContext.getModuleName(), widget as string)
        ? moduleContext.getComponents()[widget as string]
        : undefined;
    }

    return widget as ComponentCtor;
  }

  return getWidget(widgetNameFromRenderTypeResolver());
}

function executeClientAction(
  viewContext: ViewContext,
  { danger, confirm, text, execute }: ClientAction,
): void {
  const appHelper = getAppHelper();

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
      await Promise.resolve(execute(viewContext, appHelper));
    }
  };

  if (beforeExecute) {
    beforeExecute(executeAction);
  } else {
    executeAction();
  }
}

export { resolveWidgetCtor, executeClientAction };
