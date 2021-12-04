import { includes } from '@ntks/toolbox';

import { BuiltInDataType } from '../types/data-type';
import { ViewFieldDescriptor } from '../types/input';

function isEnumField(field: ViewFieldDescriptor): boolean {
  return includes(field.dataType, [BuiltInDataType.Enum, BuiltInDataType.MultiEnum]);
}

export { isEnumField };
