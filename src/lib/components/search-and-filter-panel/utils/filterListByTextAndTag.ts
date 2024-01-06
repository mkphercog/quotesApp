import { BasicListItemType, FilterByTextAndTagNameType } from "../types";

export function filterListByTextAndTag<T extends BasicListItemType>({
  list,
  text,
  tag,
}: FilterByTextAndTagNameType<T>): T[] {
  return list.filter((item) => {
    const isTextIncluded = text
      ? item.textToSearch.toLowerCase().includes(text.toLowerCase())
      : true;
    const isTagIdIncluded = tag ? item.quoteDataModelTagId === tag : true;

    return isTextIncluded && isTagIdIncluded;
  });
}
