import { DataValue } from '../../vendors/organik';

import { UnknownFilter, FilterDescriptor } from '../../types/input';
import { FilterWidgetConfig, IFilterWidget } from '../../types/widget/filter';
import { resolvePlaceholder } from '../../utils/widget';

import { BaseHeadlessWidget } from '../base';

class FilterHeadlessWidget<
  VT extends DataValue = DataValue,
  CT extends FilterWidgetConfig = FilterWidgetConfig,
  FT extends UnknownFilter = FilterDescriptor
> extends BaseHeadlessWidget<IFilterWidget<VT>, CT> {
  protected getFilter(): FT {
    return this.getProp('filter') as FT;
  }

  public getConfig(): CT {
    return (this.getFilter().config || {}) as CT;
  }

  public getPlaceholder(): string {
    return resolvePlaceholder(
      this.getFilter(),
      this.getConfig().showHintAsPlaceholder,
      this.getCommonBehavior('filter.showHintAsPlaceholder'),
    );
  }

  public isValidationRulesShownAsNative(): boolean {
    return this.getCommonBehavior('filter.showValidationRulesAsNative', false);
  }
}

export { FilterHeadlessWidget };
