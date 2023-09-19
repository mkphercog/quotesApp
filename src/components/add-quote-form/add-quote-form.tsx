import { ROUTES } from "api/routes";
import { QuoteForm } from "components/shared/quote-form/quote-form";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddQuote } from "./hooks/useAddQuote";

export const AddQuoteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sourceList,
    tagList,
    handleAddQuote,
    register,
    isAddQuoteDataMutationLoading,
    formState,
    reset,
  } = useAddQuote();

  useEffect(() => {
    navigate({
      pathname: ROUTES.manage.addQuote,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isError = !!Object.entries(formState.errors).length;

  return (
    <QuoteForm
      onSubmit={handleAddQuote}
      formState={formState}
      isError={isError}
      isLoading={isAddQuoteDataMutationLoading}
      register={register}
      reset={reset}
      sourceList={sourceList || []}
      tagList={tagList || []}
      submitButtonText="Dodaj"
    />
  );
};
