import { createContext } from "react";
import { Dispatch, State } from "./reading-mode.types";

export interface ReadingModeContextType {
  state: State;
  dispatch: Dispatch;
}

export const ReadingModeContext = createContext<
  ReadingModeContextType | undefined
>(undefined);
