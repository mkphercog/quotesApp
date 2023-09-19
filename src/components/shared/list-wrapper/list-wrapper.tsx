import { Flex, Heading, Loader, Text } from "@aws-amplify/ui-react";
import { FC, PropsWithChildren } from "react";

interface ListWrapperProps {
  isLoading: boolean;
  isEmptyList: boolean;
}

export const ListWrapper: FC<PropsWithChildren<ListWrapperProps>> = ({
  isEmptyList,
  isLoading,
  children,
}) => {
  return (
    <Flex
      direction="column"
      padding="20px"
      backgroundColor="orange.10"
      overflow="auto"
      grow="1"
      width="50%"
      maxHeight="100%"
    >
      <Heading>Lista dostępnych {isLoading && <Loader />}</Heading>

      {isEmptyList && !isLoading && <Text>Lista jest pusta.</Text>}

      {!isEmptyList && children}
    </Flex>
  );
};
