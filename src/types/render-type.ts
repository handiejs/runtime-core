type ActionRenderType = 'button' | 'link' | 'icon';

type ListViewRenderType = 'list' | 'table';

type ObjectViewRenderType = 'form';

type ViewRenderType = ListViewRenderType | ObjectViewRenderType;

type BooleanInputRenderType = 'select' | 'radio' | 'checkbox' | 'switch';

type StringInputRenderType = 'input';

type TextInputRenderType = 'input' | 'textarea';

type EnumInputRenderType = 'select' | 'radio';

type DateInputRenderType = 'date';

type OneToOneInputRenderType = ObjectViewRenderType;

type OneToManyInputRenderType = 'select' | ListViewRenderType;

type ManyToManyInputRenderType = 'select' | ListViewRenderType;

type ManyToOneInputRenderType = 'select';

type RelationInputRenderType =
  | OneToOneInputRenderType
  | OneToManyInputRenderType
  | ManyToManyInputRenderType
  | ManyToOneInputRenderType;

type InputRenderType =
  | BooleanInputRenderType
  | StringInputRenderType
  | TextInputRenderType
  | EnumInputRenderType
  | RelationInputRenderType;

export {
  ActionRenderType,
  ListViewRenderType,
  ObjectViewRenderType,
  ViewRenderType,
  BooleanInputRenderType,
  StringInputRenderType,
  TextInputRenderType,
  EnumInputRenderType,
  OneToOneInputRenderType,
  OneToManyInputRenderType,
  ManyToManyInputRenderType,
  ManyToOneInputRenderType,
  RelationInputRenderType,
  InputRenderType,
};
