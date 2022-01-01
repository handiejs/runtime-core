import { DataValue } from '../../vendors/organik';

import { BuiltInDataType } from '../../types/data-type';
import { UnknownViewField, ViewFieldDescriptor } from '../../types/input';
import { isBoolean, isFunction, includes } from '../../utils';

import { BaseHeadlessWidget } from '../base';
import { FieldWidgetConfig, IFieldWidget } from './typing';

class FieldHeadlessWidget<
  VT extends DataValue = DataValue,
  CT extends FieldWidgetConfig = FieldWidgetConfig,
  FT extends UnknownViewField = ViewFieldDescriptor
> extends BaseHeadlessWidget<IFieldWidget<VT>, CT> {
  protected getField(): FT {
    return this.getProp('field') as FT;
  }

  public getConfig(): CT {
    return (this.getField().config || {}) as CT;
  }

  public getPlaceholder(): string {
    let { showHintAsPlaceholder } = this.getConfig();

    if (showHintAsPlaceholder === undefined) {
      showHintAsPlaceholder = this.getCommonBehavior('field.showHintAsPlaceholder');
    }

    const field = this.getField();

    let defaultPlaceholder: string = '';

    if (field.dataType) {
      defaultPlaceholder = `${
        includes(field.dataType, [
          BuiltInDataType.String,
          BuiltInDataType.Text,
          BuiltInDataType.Integer,
          BuiltInDataType.Float,
        ])
          ? '请输入'
          : '请选择'
      }${field.label || ''}`;
    }

    const placeholder = field.placeholder || defaultPlaceholder;

    return showHintAsPlaceholder ? field.hint || placeholder : placeholder;
  }

  public isValidationRulesShownAsNative(configFromView: boolean | undefined): boolean {
    return isBoolean(configFromView)
      ? configFromView
      : this.getCommonBehavior('field.showValidationRulesAsNative', false);
  }

  public format(value: VT = this.getProp('value')): string {
    return isFunction(this.getField().formatter) ? this.getField().formatter!(value) : value;
  }
}

export { FieldHeadlessWidget };
