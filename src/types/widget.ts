import { ClientAction, SearchCondition, ValidationResult } from 'organik';

import { EnumFieldOption, FilterDescriptor, ViewFieldDescriptor } from './input';

interface ActionWidgetProps {
  readonly action: ClientAction;
}

interface ActionWidgetState {
  disabled: boolean;
}

interface FieldWidgetProps<ValueType> {
  readonly field: ViewFieldDescriptor;
  readonly value: ValueType;
  readonly onChange: (value: ValueType) => void;
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

interface FilterWidgetProps<ValueType> {
  readonly filter: FilterDescriptor;
  readonly value: ValueType;
  readonly onChange: (value: ValueType) => void;
}

interface EnumFilterWidgetState {
  options: EnumFieldOption[];
  optionMap: Record<string, EnumFieldOption>;
}

interface SearchWidgetState {
  condition: SearchCondition;
}

interface ViewWidgetState {
  loading: boolean;
}

interface ListViewWidgetState extends ViewWidgetState {
  dataSource: Record<string, any>[];
  pageNum: number;
  pageSize: number;
  total: number;
}

interface ObjectViewWidgetState extends ViewWidgetState {
  dataSource: Record<string, any>;
  value: Record<string, any>;
  validation: Record<string, ValidationResult>;
}

export {
  ActionWidgetProps,
  ActionWidgetState,
  FieldWidgetProps,
  ResolvedEnumFieldOption,
  EnumFieldWidgetState,
  RelationFieldWidgetState,
  FilterWidgetProps,
  EnumFilterWidgetState,
  SearchWidgetState,
  ViewWidgetState,
  ListViewWidgetState,
  ObjectViewWidgetState,
};
