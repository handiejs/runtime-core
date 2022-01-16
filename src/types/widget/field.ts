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

interface EnumFieldWidgetConfig extends FieldWidgetConfig {
  readonly showUnavailableOption?: boolean;
}

interface ResolvedEnumFieldOption extends Omit<EnumFieldOption, 'available'> {
  disabled: boolean;
}

interface FieldWidgetState extends BaseWidgetState {
  disabled: boolean;
}

interface BooleanFieldWidgetState extends FieldWidgetState {}

interface IntegerFieldWidgetState extends FieldWidgetState {}

interface StringFieldWidgetState extends FieldWidgetState {}

interface TextFieldWidgetState extends FieldWidgetState {}

interface EnumFieldWidgetState extends FieldWidgetState {
  internalOptions: EnumFieldOption[];
  options: ResolvedEnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

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
  EnumFieldWidgetConfig,
  ResolvedEnumFieldOption,
  FieldWidgetState,
  BooleanFieldWidgetState,
  IntegerFieldWidgetState,
  StringFieldWidgetState,
  TextFieldWidgetState,
  EnumFieldWidgetState,
  RelationFieldWidgetState,
  IFieldWidget,
};
