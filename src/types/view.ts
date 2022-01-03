import {
  DataValue,
  ConfigType,
  ComponentRenderer,
  ModelDescriptor as _ModelDescriptor,
  ClientAction,
  ViewDescriptor as _ViewDescriptor,
  ViewContextDescriptor as _ViewContextDescriptor,
  ListViewContextDescriptor as _ListViewContextDescriptor,
  ObjectViewContextDescriptor as _ObjectViewContextDescriptor,
} from '../vendors/organik';

import { ActionWidgetConfig } from './config';
import { ObjectValue } from './value';
import { FieldDescriptor, ViewFieldDescriptor } from './input';

type ColumnContext<Column> = { row: ObjectValue; column: Column; index: number };

type CellComponentRenderer<Column> = (
  h: (...args: any[]) => any,
  data: ColumnContext<Column>,
) => any; // eslint-disable-line @typescript-eslint/ban-types

interface TableColumn {
  width?: string | number;
  align?: string;
  render?: CellComponentRenderer<TableColumn>;
  isValid?: () => boolean;
  [key: string]: any;
}

type FieldComponentRenderer = ComponentRenderer | CellComponentRenderer<TableColumn>;

type FieldConfig = Omit<TableColumn, 'prop' | 'label' | 'render' | 'isValid'>;

interface ModelDescriptor extends Omit<_ModelDescriptor, 'fields'> {
  fields: FieldDescriptor[];
}

type OverrodeKeys = 'fields' | 'actions';

interface OverrideProperties {
  fields: (ViewFieldDescriptor | string)[];
  actions?: (Omit<ClientAction<ActionWidgetConfig>, 'category'> | string)[];
}

interface ViewDescriptor<CT extends ConfigType = ConfigType>
  extends Omit<_ViewDescriptor<CT>, OverrodeKeys>,
    OverrideProperties {}

interface ViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<_ViewContextDescriptor<VT, CT>, OverrodeKeys>,
    OverrideProperties {}

interface ListViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<_ListViewContextDescriptor<VT, CT>, OverrodeKeys>,
    OverrideProperties {}

interface ObjectViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<_ObjectViewContextDescriptor<VT, CT>, OverrodeKeys>,
    OverrideProperties {}

export {
  ColumnContext,
  CellComponentRenderer,
  TableColumn,
  FieldComponentRenderer,
  FieldConfig,
  ModelDescriptor,
  ViewDescriptor,
  ViewContextDescriptor,
  ListViewContextDescriptor,
  ObjectViewContextDescriptor,
};
