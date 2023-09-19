import { Button, Flex, Loader, Text } from "@aws-amplify/ui-react";
import { FC, PropsWithChildren, ReactNode } from "react";

interface AddFormProps {
  heading: ReactNode;
  onSubmit: () => void;
  isError?: boolean;
  errorMessage?: string;
  isDirty: boolean;
  isLoading: boolean;
  reset: () => void;
}

export const AddForm: FC<PropsWithChildren<AddFormProps>> = ({
  heading,
  onSubmit,
  isError,
  errorMessage,
  isDirty,
  isLoading,
  reset,
  children,
}) => {
  return (
    <Flex marginLeft="20px" width="50%" grow="1">
      <form style={{ width: "100%" }} onSubmit={onSubmit}>
        <Text fontWeight="semibold">
          {heading} {isLoading && <Loader />}
        </Text>
        {children}

        {isError && <Text color="font.error">{errorMessage}</Text>}
        <Button marginTop="20px" type="submit" disabled={!isDirty || isLoading}>
          Dodaj
        </Button>
        {isError && (
          <Button marginLeft="20px" onClick={() => reset()}>
            Wyczyść
          </Button>
        )}
      </form>
    </Flex>
  );
};