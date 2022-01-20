import { DataValue } from '../vendors/organik';

type ObjectValue = Record<string, any>;

type ListValue = DataValue[];

type DateValue = Date | string | number;

export { ObjectValue, ListValue, DateValue };
