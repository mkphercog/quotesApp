import type { Action, State } from "./color-mode.types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_COLOR_MODE": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
