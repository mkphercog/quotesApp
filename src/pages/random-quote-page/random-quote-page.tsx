import { useState, useEffect } from "react";
import { Button, Flex, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { useGetQuotesListQuery } from "api/quotes";
import { EagerQuoteDataModel } from "models";
import { useReading } from "utils/useReading";
import { getRandomNonRepeatingNumber } from "utils/getRandomNumber";

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
  }, [shouldGetRandomAgain, quoteList]);

  const Content = () => {
    if (!quoteList || isLoading) {
      return <Loader height="100px" margin="0 auto" />;
    }

    if (!hasQuoteListAppropriateLength) {
      return <Text fontSize="x-large">Niewystarczająca ilość cytatów</Text>;
    }

    return <Text fontSize="x-large">{randomQuote && randomQuote.content}</Text>;
  };

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
      >
        <Content />
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
