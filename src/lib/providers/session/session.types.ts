export type SessionType = {
  isGuestLogged: boolean;
  isRegularUserLogged: boolean;
  canGuestDoAction: boolean;
  currentGuestActions: number | null;
  decreaseGuestActions: () => void;
};
