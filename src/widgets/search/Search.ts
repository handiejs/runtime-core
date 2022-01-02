import { ListViewContext, SearchDescriptor } from '../../vendors/organik';

import { BaseHeadlessWidget } from '../base';
import { SearchWidgetConfig, ISearchWidget } from './typing';

class SearchHeadlessWidget<
  CT extends SearchWidgetConfig = SearchWidgetConfig
> extends BaseHeadlessWidget<ISearchWidget, CT> {
  public getConfig(): CT {
    return ((this.getViewContext<ListViewContext>().getSearch() as SearchDescriptor).config ||
      {}) as CT;
  }
}

export { SearchHeadlessWidget };
