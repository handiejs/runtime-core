import { DataValue, DataTypeDescriptor, registerDataType } from 'organik';

import { BuiltInDataType } from '../types/data-type';
import { isBoolean, isNumber, isString, isArray, isPlainObject } from '../utils';

type PartialDataTypeDescriptor = Omit<DataTypeDescriptor, 'name'>;

const numberDescriptor: PartialDataTypeDescriptor = {
  validator: isNumber,
  defaultValueGetter: () => 0,
};

const stringDescriptor: PartialDataTypeDescriptor = {
  validator: isString,
  defaultValueGetter: () => '',
};

const listDescriptor: PartialDataTypeDescriptor = {
  validator: isArray,
  defaultValueGetter: () => [],
};

const objectDescriptor: PartialDataTypeDescriptor = {
  validator: isPlainObject,
  defaultValueGetter: () => ({}),
};

function isEnumValue(value: DataValue): boolean {
  return isNumber(value) || isString(value);
}

([
  { name: BuiltInDataType.Boolean, validator: isBoolean, defaultValueGetter: () => false },
  { name: BuiltInDataType.Integer, ...numberDescriptor },
  { name: BuiltInDataType.Float, ...numberDescriptor },
  { name: BuiltInDataType.String, ...stringDescriptor },
  { name: BuiltInDataType.Text, ...stringDescriptor },
  { name: BuiltInDataType.Enum, validator: isEnumValue, defaultValueGetter: () => '' },
  {
    name: BuiltInDataType.MultiEnum,
    validator: value => isArray(value) && (value as DataValue[]).every(isEnumValue),
    defaultValueGetter: () => [],
  },
  { name: BuiltInDataType.OneToOne, ...objectDescriptor },
  { name: BuiltInDataType.OneToMany, ...listDescriptor },
  { name: BuiltInDataType.ManyToMany, ...listDescriptor },
  { name: BuiltInDataType.ManyToOne, ...objectDescriptor },
] as DataTypeDescriptor[]).forEach(registerDataType);
