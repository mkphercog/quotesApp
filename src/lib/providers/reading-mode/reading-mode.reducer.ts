import { Action, State } from "./reading-mode.types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_READING_TYPE": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
