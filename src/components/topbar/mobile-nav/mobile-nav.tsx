import { Menu, MenuItem } from "@aws-amplify/ui-react";
import { ROUTES } from "api/routes";
import { ColorModeToggler, SignOutButton } from "lib/components";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLinkClassNameProps } from "../topbar.types";

import styles from "./mobile-nav.module.scss";

interface MobileNavProps {
  isRandomQuoteSectionVisible: boolean;
}

export const MobileNav: FC<MobileNavProps> = ({
  isRandomQuoteSectionVisible,
}) => {
  const navigate = useNavigate();

  const getMobileNavLinkClasses = ({ isActive }: NavLinkClassNameProps) => {
    return `${styles.navLinkMobile} ${isActive && styles.activeMobile}`;
  };

  return (
    <div className={styles.mobileMenu}>
      <ColorModeToggler />

      <Menu>
        <MenuItem onClick={() => navigate({ pathname: ROUTES.home })}>
          <NavLink className={getMobileNavLinkClasses} to={ROUTES.home}>
            Lista cytatów
          </NavLink>
        </MenuItem>

        <MenuItem onClick={() => navigate({ pathname: ROUTES.manage.root })}>
          <NavLink className={getMobileNavLinkClasses} to={ROUTES.manage.root}>
            Zarządzaj
          </NavLink>
        </MenuItem>

        {isRandomQuoteSectionVisible && (
          <MenuItem onClick={() => navigate({ pathname: ROUTES.randomQuote })}>
            <NavLink
              className={getMobileNavLinkClasses}
              to={ROUTES.randomQuote}
            >
              Wylosuj
            </NavLink>
          </MenuItem>
        )}
        <MenuItem>
          <SignOutButton type="a" className={styles.mobileSignOut} />
        </MenuItem>
      </Menu>
    </div>
  );
};
