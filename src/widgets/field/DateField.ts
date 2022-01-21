import { ObjectViewContext } from '../../vendors/organik';

import { DateValue } from '../../types/value';
import { DateFieldWidgetConfig } from '../../types/widget/field';
import { isFunction, createMoment } from '../../utils';

import { FieldHeadlessWidget } from './Field';

class DateFieldHeadlessWidget<
  VT extends DateValue | DateValue[],
  CT extends DateFieldWidgetConfig = DateFieldWidgetConfig
> extends FieldHeadlessWidget<VT, CT> {
  public getRangeValue(): DateValue[] {
    const context = this.getViewContext() as ObjectViewContext;
    const { fromField, toField } = this.getConfig();

    if (!fromField && !toField) {
      return context.getFieldValue(this.getField().name) as DateValue[];
    }

    const range: DateValue[] = ['', ''];

    if (fromField) {
      range[0] = context.getFieldValue(fromField) || '';
    }

    if (toField) {
      range[1] = context.getFieldValue(toField) || '';
    }

    return range;
  }

  public getRangePlaceholders(): string[] {
    const { fromField, fromPlaceholder, toField, toPlaceholder } = this.getConfig();

    const labels: string[] = ['开始日期', '结束日期'];
    const placeholders: string[] = [];

    const fields = this.getViewContext().getFields();

    [
      { name: fromField, placeholder: fromPlaceholder },
      { name: toField, placeholder: toPlaceholder },
    ].forEach((targetField, idx) => {
      const { name, placeholder } = targetField;
      const field = name ? fields.find(f => name === f.name) : undefined;

      placeholders[idx] = placeholder || `请选择${(field && field.label) || labels[idx]}`;
    });

    return placeholders;
  }

  public formatDate(value: DateValue): DateValue {
    if (isFunction(this.getField().formatter)) {
      return this.getField().formatter!(value);
    }

    return this.getConfig().format ? createMoment(value).format(this.getConfig().format) : value;
  }
}

export { DateFieldHeadlessWidget };
