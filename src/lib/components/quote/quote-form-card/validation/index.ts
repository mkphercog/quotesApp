import * as yup from "yup";

export const QUOTE_CONTENT_MAX_LENGTH = 512;
export const QUOTE_COMMENT_MAX_LENGTH = 512;

export const quoteValidationSchema = yup.object({
  content: yup
    .string()
    .max(
      QUOTE_CONTENT_MAX_LENGTH,
      `Maksymalna liczba znaków to: ${QUOTE_CONTENT_MAX_LENGTH}`
    )
    .required("Pole wymagane."),
  comment: yup
    .string()
    .max(
      QUOTE_COMMENT_MAX_LENGTH,
      `Maksymalna liczba znaków to: ${QUOTE_COMMENT_MAX_LENGTH}`
    ),
  quoteDataModelSourceId: yup.string(),
  quoteDataModelTagId: yup.string(),
});

export type QuoteValidationSchemaType = typeof quoteValidationSchema;
export type QuoteValidationFormType = yup.InferType<QuoteValidationSchemaType>;

export const quoteEmptyDefaultValues: QuoteValidationFormType = {
  content: "",
  comment: "",
  quoteDataModelSourceId: "",
  quoteDataModelTagId: "",
};
