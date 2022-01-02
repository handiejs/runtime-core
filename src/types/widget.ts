import { SearchCondition, ValidationResult } from '../vendors/organik';

import { EnumFieldOption, FilterDescriptor } from './input';

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
  FilterWidgetProps,
  EnumFilterWidgetState,
  SearchWidgetState,
  ViewWidgetState,
  ListViewWidgetState,
  ObjectViewWidgetState,
};
