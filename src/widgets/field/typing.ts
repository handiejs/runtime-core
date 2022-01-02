import { EnumFieldOption, ViewFieldDescriptor } from '../../types/input';

interface FieldWidgetConfig {
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

interface EnumFieldWidgetState {
  internalOptions: EnumFieldOption[];
  options: ResolvedEnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

interface RelationFieldWidgetState<ValueType> {
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
  EnumFieldWidgetState,
  RelationFieldWidgetState,
  IFieldWidget,
};
