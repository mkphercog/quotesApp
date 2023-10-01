import { Flex, Loader, Text } from "@aws-amplify/ui-react";
import { useGetQuotesListQuery } from "api/quotes";
import { QuoteListItem } from "./quote-list-item/quote-list-item";

import styles from "./quote-list.module.scss";

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
        <Text>
          Pusta lista. Dodaj swój pierwszy cytat w zakładce "zarządzaj".
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap="20px"
      padding="20px 50px"
      margin="0 auto"
      className={styles.wrapper}
    >
      {quoteList.map((quote) => (
        <QuoteListItem key={quote.id} quote={quote} />
      ))}
    </Flex>
  );
};
