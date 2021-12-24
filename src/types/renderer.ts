import { ConfigType, ClientAction, ValidationResult } from '../vendors/organik';

import { ViewFieldDescriptor, FilterDescriptor } from './input';

interface ActionRendererProps {
  readonly action: ClientAction;
}

interface FieldRendererProps {
  readonly field: ViewFieldDescriptor;
  readonly value: any;
  readonly readonly: boolean;
  readonly onChange: (fieldName: string, value: any) => void;
}

interface FilterRendererProps {
  readonly filter: FilterDescriptor;
  readonly value: any;
  readonly onChange: (filterName: string, value: any) => void;
}

interface FormRendererProps {
  readonly fields: ViewFieldDescriptor[];
  readonly value: Record<string, any>;
  readonly readonly: boolean;
  readonly validation: Record<string, ValidationResult>;
  readonly config: ConfigType;
  readonly className: any;
  readonly onChange: (fieldName: string, value: any) => void;
}

interface ViewRendererProps {
  readonly view: string;
  readonly params: any[];
}

export {
  ActionRendererProps,
  FieldRendererProps,
  FilterRendererProps,
  FormRendererProps,
  ViewRendererProps,
};
