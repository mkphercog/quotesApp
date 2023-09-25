import { Button, Flex, Heading } from "@aws-amplify/ui-react";
import { ROUTES } from "api/routes";
import { QuoteForm } from "components/shared/quote-form/quote-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUpdateQuote } from "./hooks/useUpdateQuote";

export const UpdateQuoteForm = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    quoteDetails,
    sourceList,
    tagList,
    register,
    isUpdateQuoteMutationLoading,
    formState,
    handleSubmit,
    handleUpdateQuote,
    reset,
    watch,
  } = useUpdateQuote(params.id || "");

  useEffect(() => {
    reset(quoteDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteDetails]);

  const isError = !!Object.entries(formState.errors).length;

  if (!quoteDetails) return null;

  return (
    <Flex direction="column" alignItems="center" margin="20px 20px 0">
      <Heading fontSize="20px" padding="10px">
        TRYB EDYCJI
      </Heading>

      <QuoteForm
        onSubmit={handleSubmit((data) => {
          handleUpdateQuote(data, { id: quoteDetails.id });
          navigate({ pathname: ROUTES.home });
        })}
        submitButtonText="Uaktualnij"
        sourceList={sourceList || []}
        tagList={tagList || []}
        formState={formState}
        isError={isError}
        isLoading={isUpdateQuoteMutationLoading}
        register={register}
        reset={reset}
        watch={watch}
      />
      <Button onClick={() => navigate({ pathname: ROUTES.home })}>Wróć</Button>
    </Flex>
  );
};
