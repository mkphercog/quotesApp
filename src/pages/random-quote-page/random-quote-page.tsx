import { useState, useEffect } from "react";
import { Button, Flex, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { useGetQuotesListQuery } from "api/quotes";
import { EagerQuoteDataModel } from "models";

export const RandomQuotePage = () => {
  const [shouldGetRandomAgain, setShouldGetRandomAgain] = useState(false);
  const [randomQuote, setRandomQuote] = useState<EagerQuoteDataModel>();
  const { quoteList, isLoading } = useGetQuotesListQuery();

  const getRandomQuote = () => {
    if (quoteList) {
      const randomIndex = quoteList
        ? Math.floor(Math.random() * quoteList.length)
        : -1;

      return quoteList[randomIndex];
    }
  };

  useEffect(() => {
    setRandomQuote(getRandomQuote());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGetRandomAgain, quoteList]);

  if (!quoteList) {
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
          <Text fontSize="x-large">Niewystarczająca ilość cytatów</Text>
          {isLoading && <Loader />}
        </Flex>
      </Flex>
    );
  }

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
        <Text fontSize="x-large">{randomQuote && randomQuote.content}</Text>
      </Flex>
      <Button
        onClick={() => {
          setShouldGetRandomAgain((prevState) => !prevState);
        }}
      >
        Wylosuj ponownie
      </Button>
    </Flex>
  );
};
