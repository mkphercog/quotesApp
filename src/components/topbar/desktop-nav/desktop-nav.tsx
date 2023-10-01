import { ROUTES } from "api/routes";
import { ColorModeToggler, SignOutButton } from "lib/components";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { NavLinkClassNameProps, TopbarProps } from "../topbar.types";
import styles from "./desktop-nav.module.scss";

interface DesktopNavProps {
  isRandomQuoteSectionVisible: boolean;
  //TODO delete after create colorModeProvider!
  colorModeProps: TopbarProps;
}

export const DesktopNav: FC<DesktopNavProps> = ({
  isRandomQuoteSectionVisible,
  colorModeProps,
}) => {
  const getDesktopNavLinkClasses = ({ isActive }: NavLinkClassNameProps) => {
    return `${styles.navLink} ${isActive && styles.activeDesktop}`;
  };

  return (
    <div className={styles.desktopMenu}>
      <NavLink className={getDesktopNavLinkClasses} to={ROUTES.home}>
        Lista cytatów
      </NavLink>

      <NavLink className={getDesktopNavLinkClasses} to={ROUTES.manage.root}>
        Zarządzaj
      </NavLink>
      {isRandomQuoteSectionVisible && (
        <NavLink className={getDesktopNavLinkClasses} to={ROUTES.randomQuote}>
          Wylosuj
        </NavLink>
      )}

      <ColorModeToggler {...colorModeProps} />
      <SignOutButton />
    </div>
  );
};
