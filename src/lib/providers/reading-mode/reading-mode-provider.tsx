import { FC, PropsWithChildren, useMemo, useReducer } from "react";
import { INITIAL_STATE } from "./reading-mode.constants";
import { ReadingModeContext } from "./reading-mode.context";
import { reducer } from "./reading-mode.reducer";

export const ReadingModeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ReadingModeContext.Provider value={value}>
      {children}
    </ReadingModeContext.Provider>
  );
};
