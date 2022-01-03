import { ViewWidgetConfig, IViewWidget } from '../../types/widget/view';
import { BaseHeadlessWidget } from '../base';

class ViewHeadlessWidget<CT extends ViewWidgetConfig = ViewWidgetConfig> extends BaseHeadlessWidget<
  IViewWidget,
  CT
> {
  public getConfig(): CT {
    return (this.getViewContext().getConfig() || {}) as CT;
  }
}

export { ViewHeadlessWidget };
