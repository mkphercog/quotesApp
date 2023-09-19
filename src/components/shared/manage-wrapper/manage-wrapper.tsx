import { Flex } from "@aws-amplify/ui-react";
import { FC, PropsWithChildren } from "react";

export const ManageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      padding="20px"
      style={{
        minHeight: "calc(100vh - 200px)",
        maxHeight: "calc(100vh - 200px)",
      }}
      width="60%"
      margin="0 auto"
    >
      {children}
    </Flex>
  );
};
