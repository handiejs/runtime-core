import { SearchCondition, ValidationResult } from '../vendors/organik';

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

export { SearchWidgetState, ViewWidgetState, ListViewWidgetState, ObjectViewWidgetState };
