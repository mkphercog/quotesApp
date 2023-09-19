import {
  Badge,
  Button,
  Expander,
  ExpanderItem,
  Flex,
  Text,
} from "@aws-amplify/ui-react";
import { useDeleteQuoteMutation } from "api/quotes";
import { ROUTES } from "api/routes";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { EagerQuoteDataModel } from "../../../models";

interface QuoteListItemProps {
  quote: EagerQuoteDataModel;
}

export const QuoteListItem: FC<QuoteListItemProps> = ({ quote }) => {
  const { deleteQuoteDataMutation } = useDeleteQuoteMutation();
  const navigate = useNavigate();

  const handleNavigateToEditPage = (id: string) => {
    navigate({
      pathname: ROUTES.manage.editQuote(id),
    });
  };
  const updatedAtValue = new Date(quote.createdAt || "").toLocaleString();

  return (
    <Expander type="multiple">
      <ExpanderItem
        title={
          <Flex width="100%" justifyContent="space-between" alignItems="center">
            <Text margin="10px 0">"{quote.content}"</Text>
            {quote.tag && <Badge marginRight="10px">{quote.tag?.name}</Badge>}
          </Flex>
        }
        value={quote.id}
      >
        <Text fontSize="xx-small" color="font.secondary" textAlign="end">
          {updatedAtValue}
        </Text>

        <Flex direction="column" gap="5px">
          {quote.source?.author && (
            <Text fontSize="small" color="font.secondary" display="inline">
              Autor: {quote.source?.author}
            </Text>
          )}
          {quote.source?.title && (
            <Text fontSize="small" color="font.secondary" display="inline">
              Tytuł: {quote.source?.title}
            </Text>
          )}

          {!!quote.comment && (
            <Text fontSize="small" color="font.secondary">
              Komentarz: {quote.comment}
            </Text>
          )}
        </Flex>

        <Flex justifyContent="flex-end" marginTop="10px">
          <Button onClick={() => navigator.clipboard.writeText(quote.content)}>
            Kopiuj
          </Button>
          <Button onClick={() => handleNavigateToEditPage(quote.id)}>
            Edytuj
          </Button>
          <Button onClick={() => deleteQuoteDataMutation({ id: quote.id })}>
            Usuń
          </Button>
        </Flex>
      </ExpanderItem>
    </Expander>
  );
};
