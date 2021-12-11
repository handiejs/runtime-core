import { isString } from '@ntks/toolbox';
import {
  ComponentRenderer,
  ComponentCtor,
  ModuleContext,
  isWidgetDependency,
  getWidget,
} from 'organik';

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

export { resolveWidgetCtor };
