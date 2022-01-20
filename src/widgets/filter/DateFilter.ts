import { DateValue } from '../../types/value';
import { DateFilterWidgetConfig } from '../../types/widget/filter';

import { FilterHeadlessWidget } from './Filter';

class DateFilterHeadlessWidget<
  CT extends DateFilterWidgetConfig = DateFilterWidgetConfig
> extends FilterHeadlessWidget<DateValue, CT> {}

export { DateFilterHeadlessWidget };
