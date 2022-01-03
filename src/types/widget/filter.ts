import { EnumFieldOption, FilterDescriptor } from '../input';
import { BaseWidgetConfig, BaseWidgetState } from './base';

interface FilterWidgetConfig extends BaseWidgetConfig {
  readonly showHintAsPlaceholder?: boolean;
}

interface EnumFilterWidgetState extends BaseWidgetState {
  options: EnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

interface IFilterWidget<ValueType> {
  readonly filter: FilterDescriptor;
  readonly value: ValueType;
  readonly onChange: (value: ValueType) => void;
}

export { FilterWidgetConfig, EnumFilterWidgetState, IFilterWidget };
