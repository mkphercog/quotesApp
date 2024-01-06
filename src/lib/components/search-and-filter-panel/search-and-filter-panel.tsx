import { FC } from "react";
import { Button, Text } from "@aws-amplify/ui-react";

import {
  defaultValues,
  SearchByTextAndFilterValidationType,
} from "./validation";
import { useGetSourceListQuery } from "api/sources";
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
  shouldShowNoResults?: boolean;
  numberOfFoundItems: number | undefined;
  totalAmount: number;
  filterByTag?: boolean;
  filterBySource?: boolean;
  searching?: boolean;
  className?: string;
}

export const SearchAndFilterPanel: FC<SearchAndFilterPanelProps> = ({
  formParams,
  shouldShowNoResults = true,
  numberOfFoundItems,
  totalAmount,
  filterByTag,
  filterBySource,
  searching = true,
  className,
}) => {
  const { sourceList } = useGetSourceListQuery();
  const { tagList } = useGetTagListQuery();

  const isNoFoundItems = numberOfFoundItems === 0;

  return (
    <BaseForm className={className} formParams={formParams} onSubmit={() => {}}>
      <div className={styles.controlsWrapper}>
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
            labelText="Kategoria"
            name="filterByTag"
            options={tagList.map((tag) => ({
              id: tag.id,
              name: tag.name || "",
            }))}
          />
        )}

        {filterBySource && (
          <FormSelectField
            className={styles.filterBySourceInput}
            labelText="Źródło"
            name="filterBySource"
            options={sourceList.map((source) => {
              const separator = !source.title ? "" : !source.author ? "" : "-";

              return {
                id: source.id,
                name: `${source.title} ${separator} ${source.author}`,
              };
            })}
          />
        )}

        <Button
          onClick={() => formParams.reset(defaultValues)}
          disabled={!formParams.formState.isDirty}
        >
          Wyczyść
        </Button>
      </div>

      <div className={styles.hintsWrapper}>
        <Text>{`Znaleziono: 
              ${numberOfFoundItems ?? "-"}`}</Text>
        <Text>{`Dostępnych: 
              ${totalAmount}`}</Text>
      </div>

      {isNoFoundItems && shouldShowNoResults && (
        <div className={styles.noResultsInfo}>
          <Text>Brak wyników wyszukiwania.</Text>
        </div>
      )}
    </BaseForm>
  );
};
