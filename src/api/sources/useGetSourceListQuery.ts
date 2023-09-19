import { useQuery } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { listSourceData } from "../../graphql/queries";
import { EagerSourceData } from "../../models";
import { QueryKeys } from "../query-keys";

interface SourceDataResponseType {
  data: {
    listSourceData: {
      items: EagerSourceData[];
    };
  };
}

export const useGetSourceListQuery = () => {
  const { data: sourceList, isLoading } = useQuery({
    queryKey: [QueryKeys.sourceList],
    queryFn: async () => {
      const response = (await API.graphql(
        graphqlOperation(listSourceData)
      )) as SourceDataResponseType;

      return response.data.listSourceData.items;
    },
  });

  return { sourceList, isLoading };
};
