import { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "api/routes";
import { NavLinkClassNameProps } from "../topbar.types";
import { ColorModeToggler, SignOutButton } from "lib/components";

import cn from "classnames";
import styles from "./desktop-nav.module.scss";

interface DesktopNavProps {
  isRandomQuoteSectionVisible: boolean;
}

export const DesktopNav: FC<DesktopNavProps> = ({
  isRandomQuoteSectionVisible,
}) => {
  const getDesktopNavLinkClasses = ({ isActive }: NavLinkClassNameProps) => {
    return cn(styles.navLink, { [styles.activeDesktop]: isActive });
  };

  return (
    <div className={styles.desktopMenu}>
      <NavLink className={getDesktopNavLinkClasses} to={ROUTES.home()}>
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

      <ColorModeToggler />
      <SignOutButton />
    </div>
  );
};
