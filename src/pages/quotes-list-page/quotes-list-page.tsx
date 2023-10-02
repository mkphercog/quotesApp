import { Loader, Text } from "@aws-amplify/ui-react";
import { useGetQuotesListQuery } from "api/quotes";
import { QuoteListItem } from "lib/components";
import cn from "classnames";

import styles from "./quotes-list-page.module.scss";

export const QuotesListPage = () => {
  const { quoteList, isLoading } = useGetQuotesListQuery();

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
      {quoteList.map((quote) => (
        <QuoteListItem key={quote.id} quote={quote} />
      ))}
    </section>
  );
};
