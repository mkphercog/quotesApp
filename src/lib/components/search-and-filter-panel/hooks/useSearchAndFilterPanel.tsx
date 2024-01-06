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
  const tagValue = formParams.watch("filterByTag");

  useEffect(() => {
    return () => setFilteredList(undefined);
  }, []);

  useEffect(() => {
    if (searchValue === "" && tagValue === "") {
      setFilteredList(undefined);
    }
  }, [searchValue, tagValue]);

  useEffect(() => {
    if (
      list.length &&
      !isLoading &&
      (searchValue?.length || tagValue?.length)
    ) {
      const timeout = setTimeout(() => {
        const newList = filterListByTextAndTag<T>({
          list: list,
          text: searchValue,
          tag: tagValue,
        });

        setFilteredList(newList);
      }, 300);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, searchValue, tagValue]);

  return {
    formParams,
    filteredList,
  };
};
