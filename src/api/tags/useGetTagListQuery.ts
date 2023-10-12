import { useQuery } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { getSortedListByCreationDate } from "lib/utils";
import { listTagData } from "../../graphql/queries";
import { EagerTagData } from "../../models";
import { QueryKeys } from "../query-keys";

interface TagDataResponseType {
  data: {
    listTagData: {
      items: EagerTagData[];
    };
  };
}

export const useGetTagListQuery = () => {
  const {
    data: tagList,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [QueryKeys.tagList],
    queryFn: async () => {
      const response = (await API.graphql(
        graphqlOperation(listTagData)
      )) as TagDataResponseType;

      return response.data.listTagData.items;
    },
  });

  return {
    tagList: getSortedListByCreationDate(tagList),
    isLoading: isLoading || isFetching,
  };
};
