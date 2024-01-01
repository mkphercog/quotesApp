import { useState, useEffect, FC, useMemo } from "react";
import { Button, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { EagerQuoteDataModel } from "models";

import { useReadingMode } from "lib/providers/reading-mode";
import { QuoteListItem } from "lib/components/quote";
import { getRandomNumberFunction } from "lib/utils";
import { useGetQuotesListQuery } from "api/quotes";

import styles from "./random-quote-page.module.scss";

export const MINIMUM_QUOTES_LIST_LENGTH = 3;

export const RandomQuotePage = () => {
  const { type } = useReadingMode();
  const isReading = type === "READING";
  const [randomQuote, setRandomQuote] = useState<EagerQuoteDataModel | null>();
  const [shouldGetRandomAgain, setShouldGetRandomAgain] = useState(false);
  const { quoteList, isLoading } = useGetQuotesListQuery();
  const hasQuoteListAppropriateLength =
    Number(quoteList?.length) >= MINIMUM_QUOTES_LIST_LENGTH;

  const { getRandomNumber } = useMemo(
    () => getRandomNumberFunction({ min: 0, max: quoteList?.length || 0 }),
    [quoteList?.length]
  );

  useEffect(() => {
    if (quoteList?.length) {
      const randomNumber = getRandomNumber();
      setRandomQuote(quoteList[randomNumber]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGetRandomAgain, quoteList]);

  return (
    <div className={styles.wrapper}>
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
