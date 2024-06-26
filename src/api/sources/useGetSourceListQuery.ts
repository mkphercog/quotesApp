import { useQuery } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { getSortedListByCreationDate } from "lib/utils";
import { listSourceData } from "../../graphql/queries";
import { EagerSourceData } from "../../models";
import { QueryKeys } from "../query-keys";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface SourceDataResponseType {
  data: {
    listSourceData: {
      items: EagerSourceData[];
    };
  };
}

export const useGetSourceListQuery = () => {
  const { user } = useAuthenticator();
  const {
    data: sourceList,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [QueryKeys.sourceList, user],
    queryFn: async () => {
      const response = (await API.graphql(
        graphqlOperation(listSourceData)
      )) as SourceDataResponseType;

      return response.data.listSourceData.items;
    },
  });

  return {
    sourceList: getSortedListByCreationDate(sourceList),
    isLoading: isLoading || isFetching,
  };
};
