import { useState, useEffect, FC } from "react";
import { Button, Flex, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { useGetQuotesListQuery } from "api/quotes";
import { EagerQuoteDataModel } from "models";

import { useReading } from "lib/hooks";
import { getRandomNonRepeatingNumber } from "lib/utils";

import styles from "./random-quote-page.module.scss";

export const MINIMUM_QUOTES_LIST_LENGTH = 3;

export const RandomQuotePage = () => {
  const { startReading, stopReading, isReading } = useReading();
  const [randomQuote, setRandomQuote] = useState<EagerQuoteDataModel | null>();
  const [shouldGetRandomAgain, setShouldGetRandomAgain] = useState(false);
  const { quoteList, isLoading } = useGetQuotesListQuery();
  const hasQuoteListAppropriateLength =
    Number(quoteList?.length) >= MINIMUM_QUOTES_LIST_LENGTH;

  useEffect(() => {
    if (quoteList) {
      const randomNumber = getRandomNonRepeatingNumber({
        min: 0,
        max: quoteList.length,
      });
      setRandomQuote(quoteList[randomNumber]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGetRandomAgain, quoteList]);

  return (
    <Flex direction="column" alignItems="center">
      <Heading fontSize="20px" padding="10px" marginTop="30px">
        WYLOSOWANY CYTAT
      </Heading>
      <Flex
        padding="40px"
        boxShadow="medium"
        width="60%"
        margin="20px auto"
        backgroundColor="yellow.10"
        className={styles.contentWrapper}
      >
        <Content
          isLoading={isLoading}
          hasQuoteListAppropriateLength={hasQuoteListAppropriateLength}
          randomQuoteContent={randomQuote?.content || "Błąd losowania"}
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
  randomQuoteContent: string;
}

const Content: FC<ContentProps> = ({
  isLoading,
  hasQuoteListAppropriateLength,
  randomQuoteContent,
}) => {
  if (isLoading) {
    return <Loader height="100px" margin="0 auto" />;
  }

  if (!hasQuoteListAppropriateLength) {
    return <Text fontSize="x-large">Niewystarczająca ilość cytatów</Text>;
  }

  return <Text fontSize="x-large">{randomQuoteContent}</Text>;
};
