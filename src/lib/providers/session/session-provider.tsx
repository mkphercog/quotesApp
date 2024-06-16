import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  decreaseCurrentGuestActions,
  getCurrentGuestActions,
  setGuestInitialState,
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

  const decreaseGuestActions = useCallback(() => {
    decreaseCurrentGuestActions(isGuestLogged, canGuestDoAction);
    setCurrentGuestActions((state) => --state);
  }, [canGuestDoAction, isGuestLogged]);

  useEffect(() => {
    setIsGuestLogged(
      user.attributes?.email === process.env.REACT_APP_GUEST_USER_EMAIL
    );

    if (isGuestLogged && !getCurrentGuestActions()) {
      setCurrentGuestActions(setGuestInitialState());
    }
  }, [isGuestLogged, user]);

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
