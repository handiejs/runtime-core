import { BaseHeadlessWidget } from '../base';
import { ViewWidgetConfig, IViewWidget } from './typing';

class ViewHeadlessWidget<CT extends ViewWidgetConfig = ViewWidgetConfig> extends BaseHeadlessWidget<
  IViewWidget,
  CT
> {
  public getConfig(): CT {
    return (this.getViewContext().getConfig() || {}) as CT;
  }
}

export { ViewHeadlessWidget };
