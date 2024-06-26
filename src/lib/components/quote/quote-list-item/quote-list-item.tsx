import { FC } from "react";
import {
  Badge,
  Button,
  Expander,
  ExpanderItem,
  Text,
} from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { EagerQuoteDataModel } from "../../../../models";

import { DeleteButton } from "lib/components/delete-button/delete-button";
import { useReadingMode } from "lib/providers/reading-mode";
import { useDeleteQuoteMutation } from "api/quotes";
import { copyTextToClipboard } from "lib/utils";
import {
  FileCopyFillIcon,
  VolumeMuteFillIcon,
  VolumeUpFillIcon,
} from "lib/icons";
import { ROUTES } from "api/routes";
import { useSession } from "lib/providers/session/session.hooks";

import cn from "classnames";
import styles from "./quote-list-item.module.scss";

interface QuoteListItemProps {
  quote: EagerQuoteDataModel;
}

export const QuoteListItem: FC<QuoteListItemProps> = ({ quote }) => {
  const { deleteQuoteDataMutation } = useDeleteQuoteMutation();
  const { setIsReading, stopReading, type } = useReadingMode();
  const isReading = type === "READING";
  const navigate = useNavigate();
  const {
    decreaseGuestActions,
    isGuestLogged,
    canGuestDoAction,
    isRegularUserLogged,
  } = useSession();

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
            <pre className={styles.pre}>
              <Text className={styles.quoteHeaderText}>
                {`"${quote.content}"`}
              </Text>
            </pre>
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
            <pre
              className={cn(styles.pre, {
                [styles.commentSpace]: !!quote.source,
              })}
            >
              Komentarz:
              <Text className={styles.quoteDetailsText}>{quote.comment}</Text>
            </pre>
          )}
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            onClick={() => {
              if (isReading) {
                stopReading();
              } else {
                quote && setIsReading(quote.content);
              }
            }}
          >
            {isReading ? <VolumeMuteFillIcon /> : <VolumeUpFillIcon />}
          </Button>
          <Button
            className={styles.button}
            onClick={() => copyTextToClipboard(quote.content)}
          >
            <FileCopyFillIcon />
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleNavigateToEditPage(quote.id)}
            disabled={isReading || (isGuestLogged && !canGuestDoAction)}
          >
            Edytuj
          </Button>
          <DeleteButton
            onClick={() => {
              decreaseGuestActions();

              if (isRegularUserLogged || (isGuestLogged && canGuestDoAction)) {
                deleteQuoteDataMutation({ id: quote.id });
              }
            }}
            disabled={isReading || (isGuestLogged && !canGuestDoAction)}
          />
        </div>
      </ExpanderItem>
    </Expander>
  );
};
