import { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "api/routes";
import { NavLinkClassNameProps } from "../topbar.types";
import { ColorModeToggler, SignOutButton } from "lib/components";

import cn from "classnames";
import styles from "./desktop-nav.module.scss";
import { Text, useAuthenticator } from "@aws-amplify/ui-react";

interface DesktopNavProps {
  isRandomQuoteSectionVisible: boolean;
}

export const DesktopNav: FC<DesktopNavProps> = ({
  isRandomQuoteSectionVisible,
}) => {
  const { user } = useAuthenticator();
  const getDesktopNavLinkClasses = ({ isActive }: NavLinkClassNameProps) => {
    return cn(styles.navLink, { [styles.activeDesktop]: isActive });
  };

  return (
    <div className={styles.desktopMenu}>
      <NavLink className={getDesktopNavLinkClasses} to={ROUTES.home.root()}>
        Lista
      </NavLink>

      <NavLink className={getDesktopNavLinkClasses} to={ROUTES.manage.root()}>
        Zarządzaj
      </NavLink>
      {isRandomQuoteSectionVisible && (
        <NavLink className={getDesktopNavLinkClasses} to={ROUTES.randomQuote()}>
          Wylosuj
        </NavLink>
      )}

      <Text>Witaj, {user.attributes?.nickname}!</Text>
      <ColorModeToggler />
      <SignOutButton />
    </div>
  );
};
