import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { listQuoteDataModels } from "../graphql/queries";
import { EagerQuoteDataModel } from "../models";

interface QuoteDataResponseType {
  data: {
    listQuoteDataModels: {
      items: EagerQuoteDataModel[];
    };
  };
}

export const useGetQuoteData = () => {
  const [quotes, setQuotes] = useState<EagerQuoteDataModel[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const quoteData = (await API.graphql(
          graphqlOperation(listQuoteDataModels)
        )) as QuoteDataResponseType;

        setQuotes(quoteData.data.listQuoteDataModels.items);
      } catch (error) {
        console.log("Get quote data error: ", error);
      }
    })();
  }, []);

  return { quotes };
};
