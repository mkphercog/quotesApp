import {
  Button,
  ColorMode,
  Flex,
  SwitchField,
  Text,
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react";

import { Dispatch, FC, SetStateAction } from "react";

interface TopbarProps {
  colorMode: ColorMode;
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
}

export const Topbar: FC<TopbarProps> = ({ colorMode, setColorMode }) => {
  const { user, signOut } = useAuthenticator();
  const { breakpoints } = useTheme();
  console.log(breakpoints);
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      backgroundColor="neutral.40"
    >
      <Text
        fontSize={["10px", "10px", "20px"]}
        fontWeight="bold"
        color="font.secondary"
      >{`Witaj, ${user.attributes?.name}!`}</Text>

      <Flex alignItems="center">
        <SwitchField
          color="font.secondary"
          label={colorMode === "dark" ? "Dark mode" : "Light mode"}
          onChange={() => {
            setColorMode((currentMode) =>
              currentMode === "dark" ? "light" : "dark"
            );
          }}
        />
        <Button size="small" onClick={signOut}>
          Wyloguj się
        </Button>
      </Flex>
    </Flex>
  );
};
