import { IconProviders } from 'petals-ui/dist/icon';

import { ActionRenderType, BooleanInputRenderType, EnumInputRenderType } from './render-type';

interface ActionCommonBehaviors {
  renderType?: ActionRenderType;
  showIcon?: boolean; // 是否显示图标
  iconOnly?: boolean; // 是否只显示图标
  disableWhenNoSelection?: boolean;
}

interface FilterCommonBehaviors {
  showHintAsPlaceholder?: boolean; // 输入提示作为过滤器占位符显示
  showValidationRulesAsNative?: boolean; // 校验规则作为原生属性
  showEmptyValueOption?: boolean; // 是否显示空值（值为空字符串）的选项
  emptyValueOptionLabel?: string; // 空值选项显示的文本
}

interface SearchCommonBehaviors {
  keepConditionInUrl?: boolean;
}

interface FieldCommonBehaviors {
  booleanFieldRenderType?: BooleanInputRenderType; // 布尔字段默认部件
  enumFieldRenderType?: EnumInputRenderType;
  showUnavailableOption?: boolean;
  showHintAsPlaceholder?: boolean; // 输入提示作为表单控件占位符显示
  showHintAtFormItem?: boolean; // 输入提示显示在表单条目中
  hintPositionOfFormItem?: 'explain' | 'label'; // 表单条目中输入提示所在位置
  hintIcon?: string;
  showValidationRulesAsNative?: boolean; // 校验规则作为原生属性
}

interface ViewCommonBehaviors {
  objectViewFormLayout?: 'horizontal' | 'vertical' | 'inline'; // 表单布局
  objectViewFormControlLabelWidth?: number | string; // 表单控件文本标签宽度
  objectViewFormControlSize?: 'large' | 'medium' | 'small';
  objectViewShowValidationMessage?: boolean;
  listViewPageSizes?: number[];
  listViewDefaultPageSize?: number;
}

interface CommonWidgetBehaviors {
  action?: ActionCommonBehaviors;
  filter?: FilterCommonBehaviors;
  search?: SearchCommonBehaviors;
  field?: FieldCommonBehaviors;
  view?: ViewCommonBehaviors;
}

interface ThemeBehavior {
  common?: CommonWidgetBehaviors;
  [key: string]: any;
}

type ThemeStyle = { [key: string]: string };

interface ThemeOptions {
  icon?: {
    providers?: IconProviders;
  };
  style?: ThemeStyle;
  behavior?: ThemeBehavior;
  template?: string;
}

export { ThemeStyle, ThemeBehavior, ThemeOptions };
