import { useEffect, useState } from "react";

import { BasicListItemType, UseSearchAndFilterPanelProps } from "../types";
import { filterListByTextAndTag } from "../utils/filterListByTextAndTag";
import { defaultValues, validationSchema } from "../validation";
import { useBaseForm } from "lib/components/form";

export const useSearchAndFilterPanel = <T extends BasicListItemType>({
  list,
  isLoading,
}: UseSearchAndFilterPanelProps<T>) => {
  const [filteredList, setFilteredList] = useState<T[] | undefined>(undefined);

  const formParams = useBaseForm({
    validationSchema,
    defaultValues,
  });

  const searchValue = formParams.watch("searchByText");
  const sourceValue = formParams.watch("filterBySource");
  const tagValue = formParams.watch("filterByTag");

  useEffect(() => {
    return () => setFilteredList(undefined);
  }, []);

  useEffect(() => {
    if (searchValue === "" && tagValue === "" && sourceValue === "") {
      setFilteredList(undefined);
    }
  }, [searchValue, tagValue, sourceValue]);

  useEffect(() => {
    if (
      list.length &&
      !isLoading &&
      (searchValue?.length || tagValue?.length || sourceValue?.length)
    ) {
      const timeout = setTimeout(() => {
        const newList = filterListByTextAndTag<T>({
          list: list,
          text: searchValue,
          source: sourceValue,
          tag: tagValue,
        });

        setFilteredList(newList);
      }, 300);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, searchValue, tagValue, sourceValue]);

  return {
    formParams,
    filteredList,
  };
};
