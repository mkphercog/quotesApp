import { useQuery } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { getSortedListByCreationDate } from "lib/utils";
import { getQuoteDataModel, listQuoteDataModels } from "../../graphql/queries";
import { EagerQuoteDataModel } from "../../models";
import { QueryKeys } from "../query-keys";

interface QuoteDataResponseType {
  data: {
    listQuoteDataModels: {
      items: EagerQuoteDataModel[];
    };
  };
}

export const useGetQuotesListQuery = () => {
  const { data: quoteList, isLoading } = useQuery({
    queryKey: [QueryKeys.quoteList],
    queryFn: async () => {
      const response = (await API.graphql(
        graphqlOperation(listQuoteDataModels)
      )) as QuoteDataResponseType;

      return response.data.listQuoteDataModels.items;
    },
  });

  return {
    quoteList: getSortedListByCreationDate(quoteList),
    isLoading,
  };
};

interface QuoteDetailsResponseType {
  data: {
    getQuoteDataModel: EagerQuoteDataModel;
  };
}

export const useGetQuoteDetails = (id: string) => {
  const { data: quoteDetails, isLoading } = useQuery({
    queryKey: [QueryKeys.quoteDetails, id],
    queryFn: async () => {
      const response = (await API.graphql(
        graphqlOperation(getQuoteDataModel, {
          id,
        })
      )) as QuoteDetailsResponseType;

      return response.data.getQuoteDataModel;
    },
  });

  return { quoteDetails, isLoading };
};
