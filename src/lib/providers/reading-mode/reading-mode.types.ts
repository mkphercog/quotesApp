export type Action = {
  type: "SET_READING_TYPE";
  payload: State;
};

export type State = {
  type: "READING" | "NO_READING";
};

export type Dispatch = (action: Action) => void;
