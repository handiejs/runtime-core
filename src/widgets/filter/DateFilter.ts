import { DateValue } from '../../types/value';
import { DateFilterWidgetConfig } from '../../types/widget/filter';
import {
  isUnixTimestamp,
  createMoment,
  resolveDateValue,
  resolveRangePlaceholders,
} from '../../utils';

import { FilterHeadlessWidget } from './Filter';

class DateFilterHeadlessWidget<
  VT extends DateValue | DateValue[],
  CT extends DateFilterWidgetConfig = DateFilterWidgetConfig
> extends FilterHeadlessWidget<VT, CT> {
  private __defaultFormat: string = '';

  public setDefaultFormat(format: string): void {
    this.__defaultFormat = format;
  }

  public getDisplayFormat(): string {
    return this.getConfig().format || this.__defaultFormat;
  }

  private getValueFormat(): string {
    return this.getConfig().valueFormat || this.getDisplayFormat();
  }

  private formatDate(value: DateValue): DateValue {
    return createMoment(isUnixTimestamp(value) ? (value as number) * 1000 : value).format(
      this.getDisplayFormat(),
    );
  }

  public resolveDateValue(date: Date | null): DateValue {
    return resolveDateValue(date, this.getValueFormat());
  }

  /**
   * Get display date range
   *
   * @returns date range for display
   */
  public getRangeValue(): DateValue[] {
    const { fromField, toField } = this.getConfig();

    let range: DateValue[];

    if (!fromField && !toField) {
      range = (this.getFilterValue() || []) as DateValue[];
    } else {
      range = ['', ''];

      const context = this.getSearchContext();

      if (fromField) {
        range[0] = context.getFilterValue(fromField) || '';
      }

      if (toField) {
        range[1] = context.getFilterValue(toField) || '';
      }
    }

    return range.map(date => (date ? this.formatDate(date) : date));
  }

  public getRangePlaceholders(): string[] {
    return resolveRangePlaceholders(this.getSearchContext().getFilters(), this.getConfig());
  }

  public getSeparator(): string {
    return this.getConfig().separator || '-';
  }
}

export { DateFilterHeadlessWidget };
