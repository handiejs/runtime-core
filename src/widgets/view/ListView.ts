import { ListViewWidgetConfig } from './typing';
import { ViewHeadlessWidget } from './View';

class ListViewHeadlessWidget<
  CT extends ListViewWidgetConfig = ListViewWidgetConfig
> extends ViewHeadlessWidget<CT> {
  public getDefaultPageSize(): number {
    return (
      this.getConfig().defaultPageSize || this.getCommonBehavior('view.listViewDefaultPageSize', 20)
    );
  }
}

export { ListViewHeadlessWidget };
