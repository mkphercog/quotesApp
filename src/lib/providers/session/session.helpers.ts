import { GUEST_ACTIONS_VALUE, GUEST_LOCALSTORAGE_KEY } from "lib/constants";

export const getCurrentGuestActions = () => {
  return localStorage.getItem(GUEST_LOCALSTORAGE_KEY);
};

export const setGuestInitialState = () => {
  localStorage.setItem(GUEST_LOCALSTORAGE_KEY, GUEST_ACTIONS_VALUE.toString());

  return GUEST_ACTIONS_VALUE;
};

export const decreaseCurrentGuestActions = (
  isQuest: boolean,
  canDoActions: boolean
) => {
  if (isQuest && canDoActions) {
    let currentGuestActions = Number(getCurrentGuestActions());
    localStorage.setItem(
      GUEST_LOCALSTORAGE_KEY,
      JSON.stringify(--currentGuestActions)
    );
  }
};
