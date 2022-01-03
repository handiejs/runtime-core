import { ListViewContext, SearchDescriptor } from '../../vendors/organik';

import { SearchWidgetConfig, ISearchWidget } from '../../types/widget/search';
import { BaseHeadlessWidget } from '../base';

class SearchHeadlessWidget<
  CT extends SearchWidgetConfig = SearchWidgetConfig
> extends BaseHeadlessWidget<ISearchWidget, CT> {
  public getConfig(): CT {
    return ((this.getViewContext<ListViewContext>().getSearch() as SearchDescriptor).config ||
      {}) as CT;
  }
}

export { SearchHeadlessWidget };
