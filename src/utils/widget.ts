import { isString, isNumeric } from '@ntks/toolbox';

import {
  ClientAction,
  ViewContext,
  ComponentRenderer,
  ComponentCtor,
  InputDescriptor,
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

function renderFormFieldNodes<
  DescriptorType extends InputDescriptor & { hidden?: boolean },
  NodeType
>(
  descriptors: DescriptorType[],
  arrangement: string,
  renderChild: (descriptor: DescriptorType) => NodeType,
  renderRow: (descriptors: DescriptorType[], fakeIndex: number) => NodeType,
): NodeType[] {
  const formFieldNodes: NodeType[] = [];
  const rows = (arrangement || '').split('|') as any[];

  let needLayout = false;

  if (rows.length > 0) {
    const availableRows: number[] = [];

    rows.forEach(row => {
      if (isNumeric(row) && Number(row) > 0) {
        availableRows.push(row);
      }
    });

    needLayout = availableRows.length === rows.length;
  }

  if (needLayout) {
    const remainedFilters = descriptors.filter(({ hidden }) => hidden !== true);

    do {
      formFieldNodes.push(
        renderRow(remainedFilters.splice(0, rows.shift() * 1), remainedFilters.length),
      );
    } while (remainedFilters.length > 0 && rows.length > 0);

    if (remainedFilters.length > 0) {
      formFieldNodes.push(renderRow(remainedFilters, -1));
    }
  } else {
    descriptors.forEach(descriptor => {
      if (!descriptor.hidden) {
        formFieldNodes.push(renderChild(descriptor));
      }
    });
  }

  return formFieldNodes;
}

export { resolveWidgetCtor, executeClientAction, renderFormFieldNodes };
