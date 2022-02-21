import { EnumFieldOption, FilterDescriptor } from '../input';
import { BaseWidgetConfig, BaseWidgetState } from './base';

interface FilterWidgetConfig extends BaseWidgetConfig {
  readonly showHintAsPlaceholder?: boolean;
  readonly searchImmediately?: boolean;
}

interface BooleanFilterWidgetConfig extends FilterWidgetConfig {}

interface IntegerFilterWidgetConfig extends FilterWidgetConfig {}

interface FloatFilterWidgetConfig extends FilterWidgetConfig {}

interface StringFilterWidgetConfig extends FilterWidgetConfig {}

interface TextFilterWidgetConfig extends FilterWidgetConfig {}

interface EnumFilterWidgetConfig extends FilterWidgetConfig {}

interface DateFilterWidgetConfig extends FilterWidgetConfig {
  readonly format?: string;
  readonly showNow?: boolean;
  readonly disableDate?: (date: Date) => boolean;
  readonly separator?: string;
  readonly fromField?: string;
  readonly fromPlaceholder?: string;
  readonly toField?: string;
  readonly toPlaceholder?: string;
}

interface FilterWidgetState extends BaseWidgetState {}

interface BooleanFilterWidgetState extends FilterWidgetState {}

interface IntegerFilterWidgetState extends FilterWidgetState {}

interface FloatFilterWidgetState extends FilterWidgetState {}

interface StringFilterWidgetState extends FilterWidgetState {}

interface TextFilterWidgetState extends FilterWidgetState {}

interface EnumFilterWidgetState extends FilterWidgetState {
  options: EnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

interface DateFilterWidgetState extends FilterWidgetState {}

interface IFilterWidget<ValueType> {
  readonly filter: FilterDescriptor;
  readonly value: ValueType;
  readonly onChange: (value: ValueType) => void;
}

export {
  FilterWidgetConfig,
  BooleanFilterWidgetConfig,
  IntegerFilterWidgetConfig,
  FloatFilterWidgetConfig,
  StringFilterWidgetConfig,
  TextFilterWidgetConfig,
  EnumFilterWidgetConfig,
  DateFilterWidgetConfig,
  FilterWidgetState,
  BooleanFilterWidgetState,
  IntegerFilterWidgetState,
  FloatFilterWidgetState,
  StringFilterWidgetState,
  TextFilterWidgetState,
  EnumFilterWidgetState,
  DateFilterWidgetState,
  IFilterWidget,
};
