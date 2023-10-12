import {
  Badge,
  Button,
  Expander,
  ExpanderItem,
  Text,
} from "@aws-amplify/ui-react";
import { useDeleteQuoteMutation } from "api/quotes";
import { ROUTES } from "api/routes";
import { copyTextToClipboard } from "lib/utils";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { EagerQuoteDataModel } from "../../../models";

import styles from "./quote-list-item.module.scss";

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
  const createdAtValue = new Date(quote.createdAt || "").toLocaleString();

  return (
    <Expander type="multiple">
      <ExpanderItem
        title={
          <div className={styles.quoteHeaderWrapper}>
            <Text
              className={styles.quoteHeaderText}
            >{`"${quote.content}"`}</Text>
            {quote.tag && (
              <Badge className={styles.quoteHeaderBadge}>
                {quote.tag.name}
              </Badge>
            )}
          </div>
        }
        value={quote.id}
      >
        <Text className={styles.quoteDetailsDate}>{createdAtValue}</Text>

        <div className={styles.detailsWrapper}>
          {quote.source?.author && (
            <Text className={styles.quoteDetailsText}>
              Autor: {quote.source?.author}
            </Text>
          )}
          {quote.source?.title && (
            <Text className={styles.quoteDetailsText}>
              Tytuł: {quote.source?.title}
            </Text>
          )}

          {!!quote.comment && (
            <Text className={styles.quoteDetailsText}>
              Komentarz: {quote.comment}
            </Text>
          )}
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            className={styles.button}
            onClick={() => copyTextToClipboard(quote.content)}
          >
            Kopiuj
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleNavigateToEditPage(quote.id)}
          >
            Edytuj
          </Button>
          <Button
            className={styles.button}
            onClick={() => deleteQuoteDataMutation({ id: quote.id })}
          >
            Usuń
          </Button>
        </div>
      </ExpanderItem>
    </Expander>
  );
};
