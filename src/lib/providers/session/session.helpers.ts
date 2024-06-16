import { GUEST_LOCALSTORAGE_KEY } from "lib/constants";

export const getCurrentGuestActions = () => {
  return localStorage.getItem(GUEST_LOCALSTORAGE_KEY);
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
