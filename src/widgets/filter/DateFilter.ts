import { DateValue } from '../../types/value';
import { DateFilterWidgetConfig } from '../../types/widget/filter';
import { createMoment } from '../../utils';

import { FilterHeadlessWidget } from './Filter';

class DateFilterHeadlessWidget<
  VT extends DateValue | DateValue[],
  CT extends DateFilterWidgetConfig = DateFilterWidgetConfig
> extends FilterHeadlessWidget<VT, CT> {
  public getRangeValue(): DateValue[] {
    const context = this.getSearchContext();
    const { fromField, toField } = this.getConfig();

    if (!fromField && !toField) {
      return context.getFilterValue(this.getFilter().name) as DateValue[];
    }

    const range: DateValue[] = ['', ''];

    if (fromField) {
      range[0] = context.getFilterValue(fromField) || '';
    }

    if (toField) {
      range[1] = context.getFilterValue(toField) || '';
    }

    return range;
  }

  public getRangePlaceholders(): string[] {
    const { fromField, fromPlaceholder, toField, toPlaceholder } = this.getConfig();

    const labels: string[] = ['开始日期', '结束日期'];
    const placeholders: string[] = [];

    const filters = this.getSearchContext().getFilters();

    [
      { name: fromField, placeholder: fromPlaceholder },
      { name: toField, placeholder: toPlaceholder },
    ].forEach((targetField, idx) => {
      const { name, placeholder } = targetField;
      const filter = name ? filters.find(f => name === f.name) : undefined;

      placeholders[idx] = placeholder || `请选择${(filter && filter.label) || labels[idx]}`;
    });

    return placeholders;
  }

  public formatDate(value: DateValue): DateValue {
    return this.getConfig().format ? createMoment(value).format(this.getConfig().format) : value;
  }
}

export { DateFilterHeadlessWidget };
