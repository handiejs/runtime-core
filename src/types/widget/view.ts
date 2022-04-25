import { ValidationResult } from '../../vendors/organik';

import { BaseWidgetConfig, BaseWidgetState } from './base';

interface ViewWidgetConfig extends BaseWidgetConfig {
  readonly title?: string;
}

interface ListViewWidgetConfig extends ViewWidgetConfig {
  readonly defaultPageSize?: number;
}

interface TableViewWidgetConfig extends ListViewWidgetConfig {
  readonly pageSizes?: number[];
  readonly checkable?: boolean;
  readonly showSerialNumber?: boolean;
  readonly showTooltipWhenContentOverflow?: boolean;
  readonly selectionColumnWidth?: number | string;
  readonly selectionColumnAlignment?: 'left' | 'center' | 'right';
  readonly serialNumberColumnWidth?: number | string;
  readonly serialNumberColumnAlignment?: 'left' | 'center' | 'right';
  readonly operationColumnWidth?: number | string;
  readonly operationColumnAlignment?: 'left' | 'center' | 'right';
  readonly autoHeight?: boolean;
  readonly hidePagination?: boolean;
}

interface ViewWidgetState extends BaseWidgetState {
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
