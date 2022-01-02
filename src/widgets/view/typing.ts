import { ValidationResult } from '../../vendors/organik';

interface ViewWidgetConfig {}

interface ListViewWidgetConfig extends ViewWidgetConfig {
  readonly defaultPageSize?: number;
}

interface TableViewWidgetConfig extends ListViewWidgetConfig {
  readonly pageSizes?: number[];
  readonly checkable?: boolean;
  readonly showSerialNumber?: boolean;
  readonly title?: string;
  readonly showTooltipWhenContentOverflow?: boolean;
  readonly selectionColumnWidth?: number | string;
  readonly serialNumberColumnWidth?: number | string;
  readonly operationColumnWidth?: number | string;
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

interface IViewWidget {}

export {
  ViewWidgetConfig,
  ListViewWidgetConfig,
  TableViewWidgetConfig,
  ViewWidgetState,
  ListViewWidgetState,
  ObjectViewWidgetState,
  IViewWidget,
};
