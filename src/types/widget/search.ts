import { SearchCondition } from '../../vendors/organik';

import { BaseWidgetConfig } from './base';

interface SearchWidgetConfig extends BaseWidgetConfig {}

interface SearchWidgetState {
  condition: SearchCondition;
}

interface ISearchWidget {}

export { SearchWidgetConfig, SearchWidgetState, ISearchWidget };
