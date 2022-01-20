import { EnumFieldOption, ViewFieldDescriptor } from '../input';
import { BaseWidgetConfig, BaseWidgetState } from './base';

interface FieldWidgetConfig extends BaseWidgetConfig {
  readonly showHintAsPlaceholder?: boolean;
}

interface BooleanFieldWidgetConfig extends FieldWidgetConfig {
  readonly positiveLabel?: string;
  readonly negativeLabel?: string;
  readonly negativeFirst?: boolean;
}

interface IntegerFieldWidgetConfig extends FieldWidgetConfig {}

interface FloatFieldWidgetConfig extends FieldWidgetConfig {}

interface StringFieldWidgetConfig extends FieldWidgetConfig {}

interface TextFieldWidgetConfig extends FieldWidgetConfig {}

interface EnumFieldWidgetConfig extends FieldWidgetConfig {
  readonly showUnavailableOption?: boolean;
}

interface ResolvedEnumFieldOption extends Omit<EnumFieldOption, 'available'> {
  disabled: boolean;
}

interface DateFieldWidgetConfig extends FieldWidgetConfig {}

interface FieldWidgetState extends BaseWidgetState {
  disabled: boolean;
}

interface BooleanFieldWidgetState extends FieldWidgetState {}

interface IntegerFieldWidgetState extends FieldWidgetState {}

interface FloatFieldWidgetState extends FieldWidgetState {}

interface StringFieldWidgetState extends FieldWidgetState {}

interface TextFieldWidgetState extends FieldWidgetState {}

interface EnumFieldWidgetState extends FieldWidgetState {
  internalOptions: EnumFieldOption[];
  options: ResolvedEnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

interface DateFieldWidgetState extends FieldWidgetState {}

interface RelationFieldWidgetState<ValueType> extends FieldWidgetState {
  internalValue: ValueType;
}

interface IFieldWidget<ValueType> {
  readonly field: ViewFieldDescriptor;
  readonly value: ValueType;
  readonly onChange: (value: ValueType) => void;
}

export {
  FieldWidgetConfig,
  BooleanFieldWidgetConfig,
  IntegerFieldWidgetConfig,
  FloatFieldWidgetConfig,
  StringFieldWidgetConfig,
  TextFieldWidgetConfig,
  EnumFieldWidgetConfig,
  ResolvedEnumFieldOption,
  DateFieldWidgetConfig,
  FieldWidgetState,
  BooleanFieldWidgetState,
  IntegerFieldWidgetState,
  FloatFieldWidgetState,
  StringFieldWidgetState,
  TextFieldWidgetState,
  EnumFieldWidgetState,
  DateFieldWidgetState,
  RelationFieldWidgetState,
  IFieldWidget,
};
