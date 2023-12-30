import { QuoteFormCard } from "lib/components/quote";

import styles from "./add-quote-page.module.scss";
import { useAddQuote } from "./hooks";

export const AddQuotePage = () => {
  const {
    sourceList,
    tagList,
    formParams,
    handleAddQuote,
    clearForm,
    isAddQuoteDataMutationLoading,
  } = useAddQuote();

  return (
    <div className={styles.wrapper}>
      <QuoteFormCard
        sourceList={sourceList}
        tagList={tagList}
        formParams={formParams}
        isLoading={isAddQuoteDataMutationLoading}
        submitButtonText="Dodaj"
        onSubmit={handleAddQuote}
        clearForm={clearForm}
      />
    </div>
  );
};
