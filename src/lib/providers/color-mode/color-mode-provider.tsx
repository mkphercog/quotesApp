import { FC, PropsWithChildren, useMemo, useReducer } from "react";
import { INITIAL_STATE } from "./color-mode.constants";
import { ColorModeContext } from "./color-mode.context";
import { reducer } from "./color-mode.reducer";

export const ColorModeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};
