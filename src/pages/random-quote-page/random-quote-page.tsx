import { useState, useEffect, FC, useMemo } from "react";
import { Button, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { EagerQuoteDataModel } from "models";

import { useReadingMode } from "lib/providers/reading-mode";
import { QuoteListItem } from "lib/components/quote";
import { getRandomNumberFunction } from "lib/utils";
import { useGetQuotesListQuery } from "api/quotes";

import styles from "./random-quote-page.module.scss";
import { SearchAndFilterPanel, useSearchAndFilterPanel } from "lib/components";

export const MINIMUM_QUOTES_LIST_LENGTH = 3;

export const RandomQuotePage = () => {
  const { type } = useReadingMode();
  const isReading = type === "READING";
  const [randomQuote, setRandomQuote] = useState<EagerQuoteDataModel | null>();
  const [shouldGetRandomAgain, setShouldGetRandomAgain] = useState(false);
  const { quoteList, isLoading } = useGetQuotesListQuery();
  const hasQuoteListAppropriateLength =
    Number(quoteList?.length) >= MINIMUM_QUOTES_LIST_LENGTH;

  const { formParams, filteredList } = useSearchAndFilterPanel({
    list: quoteList.map((item) => ({
      ...item,
      textToSearch: item.content,
    })),
    isLoading: isLoading,
  });
  const list = filteredList ? filteredList : quoteList;

  const { getRandomNumber } = useMemo(
    () => getRandomNumberFunction({ min: 0, max: list?.length || 0 }),
    [list?.length]
  );

  useEffect(() => {
    if (list?.length) {
      const randomNumber = getRandomNumber();
      setRandomQuote(list[randomNumber]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGetRandomAgain, list]);

  return (
    <div className={styles.wrapper}>
      <SearchAndFilterPanel
        className={styles.filterPanel}
        formParams={formParams}
        shouldShowNoResults={false}
        numberOfFoundItems={filteredList?.length}
        totalAmount={quoteList.length}
        searching={false}
        filterBySource
        filterByTag
      />

      <Heading className={styles.heading}>WYLOSOWANY CYTAT</Heading>

      <div className={styles.contentWrapper}>
        <Content
          isLoading={isLoading}
          hasQuoteListAppropriateLength={hasQuoteListAppropriateLength}
          quoteData={randomQuote}
        />
      </div>

      {hasQuoteListAppropriateLength && (
        <Button
          onClick={() => {
            setShouldGetRandomAgain((prevState) => !prevState);
          }}
          disabled={isReading}
        >
          Wylosuj ponownie
        </Button>
      )}
    </div>
  );
};

interface ContentProps {
  isLoading: boolean;
  hasQuoteListAppropriateLength: boolean;
  quoteData: EagerQuoteDataModel | null | undefined;
}

const Content: FC<ContentProps> = ({
  isLoading,
  hasQuoteListAppropriateLength,
  quoteData,
}) => {
  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (!hasQuoteListAppropriateLength) {
    return <Text fontSize="x-large">Niewystarczająca ilość cytatów</Text>;
  }

  if (!quoteData) return <Text fontSize="x-large">Błąd losowania!</Text>;

  return <QuoteListItem quote={quoteData} />;
};
