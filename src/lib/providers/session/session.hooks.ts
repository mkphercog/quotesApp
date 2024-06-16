import { useContext } from "react";
import { SessionContext } from "./session-provider";

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionContext");
  }

  return context;
};
