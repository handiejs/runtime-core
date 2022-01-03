import { ViewContext } from '../../vendors/organik';

import { EnumFieldOption, EnumField } from '../../types/input';
import { FilterWidgetConfig } from '../../types/widget/filter';
import { resolveEnumOptions } from '../../utils/widget';

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
