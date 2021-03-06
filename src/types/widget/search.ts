import { SearchCondition } from '../../vendors/organik';

import { BaseWidgetConfig, BaseWidgetState } from './base';

interface SearchWidgetConfig extends BaseWidgetConfig {
  readonly searchWhenSelectableFilterChange?: boolean;
}

interface SearchWidgetState extends BaseWidgetState {
  condition: SearchCondition;
}

interface ISearchWidget {}

export { SearchWidgetConfig, SearchWidgetState, ISearchWidget };
