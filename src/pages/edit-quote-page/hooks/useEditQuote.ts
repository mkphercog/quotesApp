import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "api/routes";
import { useGetTagListQuery } from "api/tags";
import { useGetSourceListQuery } from "api/sources";
import { useGetQuoteDetails, useUpdateQuoteMutation } from "api/quotes";
import {
  QuoteValidationFormType,
  quoteValidationSchema as validationSchema,
} from "lib/components/quote";
import { useBaseForm } from "lib/components/form";
import { mapQuotesDetailsToQuoteDefaultValues } from "../utils";

export const useEditQuote = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { quoteDetails } = useGetQuoteDetails(params.id || "");
  const { sourceList } = useGetSourceListQuery();
  const { tagList } = useGetTagListQuery();
  const { updateQuoteDataMutation, isUpdateQuoteMutationLoading } =
    useUpdateQuoteMutation();

  const defaultValuesOnQuoteDetails = useMemo(
    () => mapQuotesDetailsToQuoteDefaultValues(quoteDetails),
    [quoteDetails]
  );

  const formParams = useBaseForm({
    defaultValues: defaultValuesOnQuoteDetails,
    validationSchema,
  });

  const clearForm = () => {
    formParams.reset(defaultValuesOnQuoteDetails);
  };

  useEffect(() => {
    clearForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, quoteDetails]);

  const handleEditQuote = (newQueryData: QuoteValidationFormType) => {
    updateQuoteDataMutation(
      {
        id: params.id || "",
        ...newQueryData,
        content: newQueryData.content.trim(),
        comment: newQueryData.comment?.trim(),
      },
      {
        onSuccess: () => navigate(ROUTES.home.back()),
      }
    );
    clearForm();
  };

  return {
    sourceList,
    tagList,
    isUpdateQuoteMutationLoading,
    formParams,
    handleEditQuote,
    clearForm,
  };
};
