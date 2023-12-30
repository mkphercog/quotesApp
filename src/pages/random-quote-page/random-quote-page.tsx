import { useState, useEffect, FC, useMemo } from "react";
import { Button, Flex, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { EagerQuoteDataModel } from "models";

import { useReading } from "lib/hooks";
import { getRandomNumberFunction } from "lib/utils";
import { QuoteListItem } from "lib/components/quote";
import { useGetQuotesListQuery } from "api/quotes";

import styles from "./random-quote-page.module.scss";

export const MINIMUM_QUOTES_LIST_LENGTH = 3;

export const RandomQuotePage = () => {
  const { startReading, stopReading, isReading } = useReading();
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
    <Flex direction="column" alignItems="center">
      <Heading fontSize="20px" padding="10px" marginTop="30px">
        WYLOSOWANY CYTAT
      </Heading>
      <Flex className={styles.contentWrapper}>
        <Content
          isLoading={isLoading}
          hasQuoteListAppropriateLength={hasQuoteListAppropriateLength}
          quoteData={randomQuote}
        />
      </Flex>

      {hasQuoteListAppropriateLength && (
        <Flex>
          <Button
            onClick={() => {
              if (isReading) {
                stopReading();
              } else {
                randomQuote && startReading(randomQuote.content);
              }
            }}
          >
            {isReading ? "Stop" : "Przeczytaj"}
          </Button>
          <Button
            onClick={() => {
              setShouldGetRandomAgain((prevState) => !prevState);
            }}
            disabled={isReading}
          >
            Wylosuj ponownie
          </Button>
        </Flex>
      )}
    </Flex>
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
    return <Loader height="100px" margin="0 auto" />;
  }

  if (!hasQuoteListAppropriateLength) {
    return <Text fontSize="x-large">Niewystarczająca ilość cytatów</Text>;
  }

  if (!quoteData) return <Text fontSize="x-large">Błąd losowania!</Text>;

  return <QuoteListItem quote={quoteData} />;
};
