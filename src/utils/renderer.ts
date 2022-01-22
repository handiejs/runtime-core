import { DataType, RenderType } from '../vendors/organik';

import { BuiltInDataType } from '../types/data-type';
import { ViewFieldDescriptor, FilterDescriptor } from '../types/input';
import { getBehaviorByKey } from './theme';

function getDefaultRenderTypeMapOfField(): Record<DataType, RenderType> {
  return {
    [BuiltInDataType.Boolean]: getBehaviorByKey('common.field.booleanFieldRenderType'),
    [BuiltInDataType.Integer]: 'number',
    [BuiltInDataType.Float]: 'number',
    [BuiltInDataType.String]: 'input',
    [BuiltInDataType.Text]: 'textarea',
    [BuiltInDataType.Enum]: getBehaviorByKey('common.field.enumFieldRenderType'),
    [BuiltInDataType.MultiEnum]: 'select',
    [BuiltInDataType.Date]: getBehaviorByKey('common.field.dateFieldRenderType'),
    [BuiltInDataType.OneToOne]: 'select',
    [BuiltInDataType.OneToMany]: 'select',
    [BuiltInDataType.ManyToMany]: 'select',
    [BuiltInDataType.ManyToOne]: 'select',
  };
}

function resolveFieldRenderType({ renderType, dataType = '' }: ViewFieldDescriptor): string {
  return renderType || getDefaultRenderTypeMapOfField()[dataType] || '';
}

const dataTypeToRenderTypeMapOfFilter: Record<DataType, RenderType> = {
  [BuiltInDataType.Boolean]: 'select',
  [BuiltInDataType.String]: 'input',
  [BuiltInDataType.Text]: 'input',
  [BuiltInDataType.Integer]: 'number',
  [BuiltInDataType.Float]: 'number',
  [BuiltInDataType.Enum]: 'select',
  [BuiltInDataType.MultiEnum]: 'select',
  [BuiltInDataType.OneToOne]: 'select',
  [BuiltInDataType.OneToMany]: 'select',
  [BuiltInDataType.ManyToMany]: 'select',
  [BuiltInDataType.ManyToOne]: 'select',
};

function resolveFilterRenderType({ renderType, dataType = '' }: FilterDescriptor): string {
  return renderType || dataTypeToRenderTypeMapOfFilter[dataType] || '';
}

export { resolveFieldRenderType, resolveFilterRenderType };
