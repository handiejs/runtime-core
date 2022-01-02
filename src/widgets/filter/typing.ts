import { EnumFieldOption, FilterDescriptor } from '../../types/input';

interface FilterWidgetConfig {
  readonly showHintAsPlaceholder?: boolean;
}

interface EnumFilterWidgetState {
  options: EnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

interface IFilterWidget<ValueType> {
  readonly filter: FilterDescriptor;
  readonly value: ValueType;
  readonly onChange: (value: ValueType) => void;
}

export { FilterWidgetConfig, EnumFilterWidgetState, IFilterWidget };
