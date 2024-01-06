import { Loader, Text } from "@aws-amplify/ui-react";

import { SearchAndFilterPanel, useSearchAndFilterPanel } from "lib/components";
import { QuoteListItem } from "lib/components/quote";
import { useGetQuotesListQuery } from "api/quotes";

import cn from "classnames";
import styles from "./quotes-list-page.module.scss";

export const QuotesListPage = () => {
  const { quoteList, isLoading } = useGetQuotesListQuery();
  const { filteredList, formParams } = useSearchAndFilterPanel({
    list: quoteList.map((item) => ({
      ...item,
      textToSearch: item.content,
    })),
    isLoading,
  });
  const list = filteredList ? filteredList : quoteList;

  if (isLoading) {
    return (
      <section className={styles.wrapper}>
        <Loader className={styles.loader} />
      </section>
    );
  }

  if (!quoteList?.length) {
    return (
      <section className={cn(styles.wrapper, styles.noQuotes)}>
        <Text>
          Pusta lista. Dodaj swój pierwszy cytat w zakładce "Zarządzaj".
        </Text>
      </section>
    );
  }

  return (
    <section className={styles.listWrapper}>
      <SearchAndFilterPanel
        formParams={formParams}
        numberOfFoundItems={filteredList?.length}
        totalAmount={quoteList.length}
        filterBySource
        filterByTag
      />
      {list.map((quote) => (
        <QuoteListItem key={quote.id} quote={quote} />
      ))}
    </section>
  );
};
