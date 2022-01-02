import { isString, isNumeric, isFunction, includes } from '@ntks/toolbox';

import {
  ComponentRenderer,
  ComponentCtor,
  InputDescriptor,
  ModuleContext,
  ViewContext,
  isWidgetDependency,
  getWidget,
} from '../vendors/organik';

import { BuiltInDataType } from '../types/data-type';
import {
  EnumFieldOption,
  EnumFieldOptionGetter,
  EnumField,
  FilterDescriptor,
  ViewFieldDescriptor,
} from '../types/input';
import { cacheDynamicEnumOptions, getCachedEnumOptions } from '../utils/input';

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

function resolvePlaceholder(
  fieldOrFilter: ViewFieldDescriptor | FilterDescriptor,
  behaviorFromConfig: boolean | undefined,
  behaviorFromTheme: boolean,
): string {
  let defaultPlaceholder: string = '';

  if (fieldOrFilter.dataType) {
    defaultPlaceholder = `${
      includes(fieldOrFilter.dataType, [
        BuiltInDataType.String,
        BuiltInDataType.Text,
        BuiltInDataType.Integer,
        BuiltInDataType.Float,
      ])
        ? '请输入'
        : '请选择'
    }${fieldOrFilter.label || ''}`;
  }

  const showHintAsPlaceholder =
    behaviorFromConfig === undefined ? behaviorFromTheme : behaviorFromConfig;
  const placeholder = fieldOrFilter.placeholder || defaultPlaceholder;

  return showHintAsPlaceholder ? fieldOrFilter.hint || placeholder : placeholder;
}

function resolveEnumOptions(
  context: ViewContext,
  fieldOrFilter: EnumField,
  callback: (options: EnumFieldOption[]) => void,
): void {
  const { options } = fieldOrFilter;

  if (isFunction(options)) {
    const moduleName = context.getModuleContext().getModuleName();
    const cachedOptions = getCachedEnumOptions(moduleName, fieldOrFilter);

    if (cachedOptions) {
      callback(cachedOptions);
    } else {
      (options as EnumFieldOptionGetter)().then(({ success, data }) => {
        if (success) {
          cacheDynamicEnumOptions(moduleName, fieldOrFilter, data);
          callback(data);
        }
      });
    }
  } else {
    callback((options as EnumFieldOption[]) || []); // eslint-disable-line node/no-callback-literal
  }
}

export { resolveWidgetCtor, renderFormFieldNodes, resolvePlaceholder, resolveEnumOptions };
