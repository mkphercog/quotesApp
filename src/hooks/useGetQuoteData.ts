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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const quoteData = (await API.graphql(
          graphqlOperation(listQuoteDataModels)
        )) as QuoteDataResponseType;
        setQuotes(quoteData.data.listQuoteDataModels.items);
        setIsLoading(false);
      } catch (error) {
        console.log("Get quote data error: ", error);
        setIsLoading(false);
      }
    })();
  }, []);

  return { quotes, isLoading };
};
