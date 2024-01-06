import { EagerQuoteDataModel } from "models";

export type UseSearchAndFilterPanelProps<T extends BasicListItemType> = {
  list: T[];
  isLoading: boolean;
};

export type BasicListItemType = {
  textToSearch: string;
  quoteDataModelTagId?: EagerQuoteDataModel["quoteDataModelTagId"];
  quoteDataModelSourceId?: EagerQuoteDataModel["quoteDataModelSourceId"];
};

export type FilterByTextAndTagNameType<T extends BasicListItemType> = {
  list: T[];
  text: string | undefined;
  source: string | undefined;
  tag: string | undefined;
};
