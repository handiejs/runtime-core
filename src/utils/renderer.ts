import { DataType, RenderType } from '../vendors/organik';

import { BuiltInDataType } from '../types/data-type';
import { ViewFieldDescriptor, FilterDescriptor } from '../types/input';
import { getBehaviorByKey } from './theme';

function resolveFieldRenderType({ renderType, dataType = '' }: ViewFieldDescriptor): string {
  const dataTypeToRenderTypeMapOfField: Record<DataType, RenderType> = {
    [BuiltInDataType.Boolean]: getBehaviorByKey('common.field.booleanFieldRenderType'),
    [BuiltInDataType.String]: 'input',
    [BuiltInDataType.Text]: 'textarea',
    [BuiltInDataType.Enum]: getBehaviorByKey('common.field.enumFieldRenderType'),
    [BuiltInDataType.MultiEnum]: 'select',
    [BuiltInDataType.OneToOne]: 'select',
    [BuiltInDataType.OneToMany]: 'select',
    [BuiltInDataType.ManyToMany]: 'select',
    [BuiltInDataType.ManyToOne]: 'select',
  };

  return renderType || dataTypeToRenderTypeMapOfField[dataType] || '';
}

const dataTypeToRenderTypeMapOfFilter: Record<DataType, RenderType> = {
  [BuiltInDataType.Boolean]: 'select',
  [BuiltInDataType.String]: 'input',
  [BuiltInDataType.Text]: 'input',
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
