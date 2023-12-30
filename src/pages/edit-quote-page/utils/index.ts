import { EagerQuoteDataModel } from "models";
import { QuoteValidationFormType } from "lib/components/quote";

type MapQuotesDetailsToQuoteDefaultValuesType = (
  quoteDetails: EagerQuoteDataModel | undefined
) => QuoteValidationFormType | undefined;

export const mapQuotesDetailsToQuoteDefaultValues: MapQuotesDetailsToQuoteDefaultValuesType =
  (quoteDetails) => {
    if (!quoteDetails) return undefined;

    return {
      content: quoteDetails.content,
      comment: quoteDetails?.comment || "",
      quoteDataModelSourceId: quoteDetails?.quoteDataModelSourceId || "",
      quoteDataModelTagId: quoteDetails?.quoteDataModelTagId || "",
    };
  };
