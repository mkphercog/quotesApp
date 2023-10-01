import { FC } from "react";
import { Button, useAuthenticator } from "@aws-amplify/ui-react";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "api/routes";
import { useLocation, useNavigate } from "react-router-dom";

interface SignOutButtonProps {
  type?: "button" | "a";
  className?: string;
}

export const SignOutButton: FC<SignOutButtonProps> = ({ type, className }) => {
  const { signOut } = useAuthenticator();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = async () => {
    if (location.pathname.includes("editQuote")) {
      navigate({ pathname: ROUTES.home });
    }

    await queryClient.invalidateQueries();
    queryClient.removeQueries();
    signOut();
  };

  return (
    <Button
      as={type === "a" ? "a" : "button"}
      className={className}
      size="small"
      variation="primary"
      onClick={logOut}
    >
      Wyloguj się
    </Button>
  );
};
