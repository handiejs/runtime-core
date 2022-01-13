import { isString, isNumeric, isFunction, includes } from '@ntks/toolbox';
import { FlexBreakpointListProp } from 'petals-ui/dist/basic';

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

const BREAKPOINT_PART = '(xs|sm|md|lg|xl)-[1-9]{1,2}';
const fullRegExp = new RegExp(`^([?${BREAKPOINT_PART}(/${BREAKPOINT_PART}){0,}]?,?)+$`);

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

function resolveBreakpoints(cols: string): FlexBreakpointListProp[] {
  return cols.split(',').map(col =>
    col
      .replace(/(\[|\])/g, '')
      .split('/')
      .reduce((prev, breakpoint) => {
        const [size, span] = breakpoint.split('-');

        return { ...prev, [size]: Number(span) };
      }, {}),
  );
}

function renderFormFieldNodes<
  DescriptorType extends InputDescriptor & { hidden?: boolean },
  NodeType
>(
  descriptors: DescriptorType[],
  arrangement: string | undefined,
  renderChild: (descriptor: DescriptorType) => NodeType,
  renderRow: (descriptors: DescriptorType[], cols: FlexBreakpointListProp[] | number) => NodeType,
): NodeType[] {
  const formFieldNodes: NodeType[] = [];
  const rows = (arrangement || '').split('|');

  const needLayout =
    rows.length > 0 &&
    rows.filter(row => (isNumeric(row) && Number(row) > 0) || fullRegExp.test(row)).length ===
      rows.length;

  if (needLayout) {
    const remainedFilters = descriptors.filter(({ hidden }) => hidden !== true);

    do {
      const cols = rows.shift()!;

      let breakpoints: FlexBreakpointListProp[] = [];
      let count: number;

      if (isNumeric(cols)) {
        count = Number(cols);
      } else {
        breakpoints = resolveBreakpoints(cols);
        count = breakpoints.length;
      }

      formFieldNodes.push(renderRow(remainedFilters.splice(0, count), breakpoints));
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

function renderFormChildren<
  DescriptorType extends InputDescriptor & { hidden?: boolean },
  NodeType
>(
  descriptors: DescriptorType[],
  arrangement: string | undefined,
  renderGroup: (title: string, formFieldNodes: NodeType[]) => NodeType,
  renderChild: (descriptor: DescriptorType) => NodeType,
  renderRow: (descriptors: DescriptorType[], cols: FlexBreakpointListProp[] | number) => NodeType,
): NodeType[] {
  const groups = (arrangement || '').match(/\(([^()]+)\)/g);

  if (!groups) {
    return renderFormFieldNodes(descriptors, arrangement, renderChild, renderRow);
  }

  let startIndex = 0;
  let endIndex = 0;

  return groups
    .map(group => group.replace(/\(|\)/g, ''))
    .filter(group => !!group)
    .map(group => {
      const grouped = group.split(':');
      const count = grouped[1]
        .split('|')
        .reduce((prev, row) => (isNumeric(row) ? Number(row) : row.split(',').length) + prev, 0);

      endIndex = startIndex + count;

      const fields = renderGroup(
        grouped[0],
        renderFormFieldNodes(
          descriptors.slice(startIndex, endIndex),
          grouped[1],
          renderChild,
          renderRow,
        ),
      );

      startIndex = endIndex;

      return fields;
    });
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

export { resolveWidgetCtor, renderFormChildren, resolvePlaceholder, resolveEnumOptions };
