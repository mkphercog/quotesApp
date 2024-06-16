import { useAuthenticator } from "@aws-amplify/ui-react";
import { GUEST_ACTIONS_VALUE, GUEST_LOCALSTORAGE_KEY } from "lib/constants";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  decreaseCurrentGuestActions,
  getCurrentGuestActions,
} from "./session.helpers";
import { SessionType } from "./session.types";

export const SessionContext = createContext<SessionType | undefined>(undefined);

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthenticator();
  const [isGuestLogged, setIsGuestLogged] = useState(false);
  const [currentGuestActions, setCurrentGuestActions] = useState(
    Number(getCurrentGuestActions())
  );

  const canGuestDoAction = currentGuestActions > 0;

  if (isGuestLogged && !getCurrentGuestActions()) {
    localStorage.setItem(
      GUEST_LOCALSTORAGE_KEY,
      GUEST_ACTIONS_VALUE.toString()
    );
  }

  const decreaseGuestActions = useCallback(() => {
    decreaseCurrentGuestActions(isGuestLogged, canGuestDoAction);
    setCurrentGuestActions((state) => --state);
  }, [canGuestDoAction, isGuestLogged]);

  useEffect(() => {
    setIsGuestLogged(
      user.attributes?.email === process.env.REACT_APP_GUEST_USER_EMAIL
    );
  }, [user]);

  const value = useMemo<SessionType>(
    () => ({
      isGuestLogged,
      isRegularUserLogged: !isGuestLogged,
      canGuestDoAction,
      currentGuestActions,
      decreaseGuestActions,
    }),
    [canGuestDoAction, currentGuestActions, decreaseGuestActions, isGuestLogged]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
