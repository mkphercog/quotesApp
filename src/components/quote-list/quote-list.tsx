import {
  Badge,
  Card,
  Divider,
  Flex,
  Heading,
  Loader,
  Text,
} from "@aws-amplify/ui-react";
import { useGetQuoteData } from "../../hooks/useGetQuoteData";

export const QuoteList = () => {
  const { quotes, isLoading } = useGetQuoteData();
  if (isLoading) {
    return (
      <Flex justifyContent="center" marginTop="large">
        <Loader width="100px" height="100px" />
      </Flex>
    );
  }

  if (!quotes.length) {
    return (
      <Flex justifyContent="center" marginTop="large">
        <Text>Empty list! Add Your first quote.</Text>
      </Flex>
    );
  }

  return (
    <>
      {quotes.map((quote) => (
        <Card
          key={quote.id}
          variation="elevated"
          margin="medium"
          maxWidth="300px"
          backgroundColor="yellow.10"
        >
          <Heading fontSize="medium" color="teal.80">
            {quote.source?.title}
          </Heading>
          <Text fontSize="small" color="font.secondary">
            {quote.source?.author}
          </Text>

          {quote.tag && <Badge>{quote.tag?.name}</Badge>}

          {quote.source && <Divider margin="15px 0" />}
          <Text fontSize="large">{`"${quote.content}"`}</Text>
        </Card>
      ))}
    </>
  );
};
