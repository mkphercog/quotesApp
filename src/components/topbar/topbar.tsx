import {
  Button,
  ColorMode,
  Flex,
  SwitchField,
  Text,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { useQueryClient } from "@tanstack/react-query";

import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setColorModeToLocalStorage } from "utils/localStorageColorModeManagement";
import { ROUTES } from "../../api/routes";
import "./topbar.css";

interface TopbarProps {
  colorMode: ColorMode;
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
}

export const Topbar: FC<TopbarProps> = ({ colorMode, setColorMode }) => {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries();
      queryClient.removeQueries();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = async () => {
    signOut();
    await queryClient.invalidateQueries();
    queryClient.removeQueries();
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
        backgroundColor="neutral.40"
      >
        <Text
          onClick={() => navigate({ pathname: ROUTES.home })}
          style={{ cursor: "pointer" }}
          fontSize="20px"
          fontWeight="bold"
          color="font.secondary"
        >
          Quotes App
        </Text>

        <Flex marginLeft="auto">
          <NavLink className="nav_link" to={ROUTES.home}>
            Lista cytatów
          </NavLink>

          <NavLink className="nav_link" to={ROUTES.manage.root}>
            Zarządzaj
          </NavLink>
        </Flex>

        <Flex alignItems="center">
          <SwitchField
            color="font.secondary"
            label={colorMode === "dark" ? "Dark mode" : "Light mode"}
            onChange={() => {
              setColorMode((currentMode) => {
                const toggledColorMode =
                  currentMode === "dark" ? "light" : "dark";
                setColorModeToLocalStorage(toggledColorMode);
                return toggledColorMode;
              });
            }}
          />

          <Button size="small" onClick={logOut}>
            Wyloguj się
          </Button>
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};
