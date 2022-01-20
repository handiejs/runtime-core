import { DateValue } from '../../types/value';
import { DateFieldWidgetConfig } from '../../types/widget/field';

import { FieldHeadlessWidget } from './Field';

class DateFieldHeadlessWidget<
  CT extends DateFieldWidgetConfig = DateFieldWidgetConfig
> extends FieldHeadlessWidget<DateValue, CT> {}

export { DateFieldHeadlessWidget };
