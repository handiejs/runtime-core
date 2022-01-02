import { ViewContext } from '../../vendors/organik';

import { EnumFieldOption, EnumField } from '../../types/input';
import { resolveEnumOptions } from '../../utils/widget';

import { FilterWidgetConfig } from './typing';
import { FilterHeadlessWidget } from './Filter';

class EnumFilterHeadlessWidget<
  VT,
  CT extends FilterWidgetConfig = FilterWidgetConfig
> extends FilterHeadlessWidget<VT, CT, EnumField> {
  public initOptions(
    viewContext: ViewContext,
    callback: (options: EnumFieldOption[]) => void,
  ): void {
    resolveEnumOptions(viewContext, this.getFilter(), callback);
  }
}

export { EnumFilterHeadlessWidget };
