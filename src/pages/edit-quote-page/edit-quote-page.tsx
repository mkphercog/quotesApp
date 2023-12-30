import { useNavigate } from "react-router-dom";
import { Button, Heading } from "@aws-amplify/ui-react";

import { ROUTES } from "api/routes";
import { useEditQuote } from "./hooks";
import { QuoteFormCard } from "lib/components/quote";

import styles from "./edit-quote-page.module.scss";

export const EditQuotePage = () => {
  const navigate = useNavigate();
  const {
    sourceList,
    tagList,
    formParams,
    isUpdateQuoteMutationLoading,
    handleEditQuote,
    clearForm,
  } = useEditQuote();

  return (
    <div className={styles.wrapper}>
      <Heading className={styles.heading}>TRYB EDYCJI</Heading>

      <QuoteFormCard
        sourceList={sourceList}
        tagList={tagList}
        formParams={formParams}
        isLoading={isUpdateQuoteMutationLoading}
        submitButtonText="Uaktualnij"
        onSubmit={handleEditQuote}
        clearForm={clearForm}
      />

      <Button
        className={styles.backButton}
        onClick={() => navigate(ROUTES.home.back())}
      >
        Wróć
      </Button>
    </div>
  );
};
