import { Flex, Loader, Text } from "@aws-amplify/ui-react";
import { useGetQuotesListQuery } from "api/quotes";
import { QuoteListItem } from "./quote-list-item/quote-list-item";

export const QuoteList = () => {
  const { quoteList, isLoading } = useGetQuotesListQuery();

  if (isLoading) {
    return (
      <Flex justifyContent="center" marginTop="large">
        <Loader width="100px" height="100px" />
      </Flex>
    );
  }

  if (!quoteList?.length) {
    return (
      <Flex justifyContent="center" marginTop="large">
        <Text>Empty list! Add Your first quote.</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap="20px"
      padding="20px 50px"
      width="60%"
      margin="0 auto"
    >
      {quoteList.map((quote) => (
        <QuoteListItem key={quote.id} quote={quote} />
      ))}
    </Flex>
  );
};
