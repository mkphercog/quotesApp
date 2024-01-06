import { FC } from "react";
import { Text } from "@aws-amplify/ui-react";

import { SearchByTextAndFilterValidationType } from "./validation";
import { useGetTagListQuery } from "api/tags";
import {
  BaseForm,
  FormSelectField,
  FormTextInput,
  UseBaseFormReturnedParams,
} from "../form";

import styles from "./search-and-filter-panel.module.scss";

interface SearchAndFilterPanelProps {
  formParams: UseBaseFormReturnedParams<SearchByTextAndFilterValidationType>;
  numberOfFoundItems: number | undefined;
  filterByTag?: boolean;
  searching?: boolean;
  className?: string;
}

export const SearchAndFilterPanel: FC<SearchAndFilterPanelProps> = ({
  formParams,
  numberOfFoundItems,
  filterByTag,
  searching = true,
  className,
}) => {
  const { tagList } = useGetTagListQuery();
  const isNoFoundItems = numberOfFoundItems === 0;

  return (
    <BaseForm className={className} formParams={formParams} onSubmit={() => {}}>
      <div className={styles.inputsWrapper}>
        {searching && (
          <FormTextInput
            className={styles.searchingInput}
            labelText=""
            name="searchByText"
            placeholder="Wyszukaj..."
          />
        )}

        {filterByTag && (
          <FormSelectField
            className={styles.filterByTagInput}
            labelText=""
            name="filterByTag"
            options={tagList.map((tag) => ({
              id: tag.id,
              name: tag.name || "",
            }))}
          />
        )}
      </div>

      {!isNoFoundItems && (
        <div className={styles.foundHint}>
          <Text>{`Znaleziono: 
              ${numberOfFoundItems ?? "-"}`}</Text>
        </div>
      )}

      {isNoFoundItems && (
        <div className={styles.noResultsInfo}>
          <Text>Brak wyników wyszukiwania.</Text>
        </div>
      )}
    </BaseForm>
  );
};
