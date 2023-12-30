import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@aws-amplify/ui-react";

import { ROUTES } from "api/routes";
import { NavLinkClassNameProps } from "../topbar.types";
import { ColorModeToggler, SignOutButton } from "lib/components";

import cn from "classnames";
import styles from "./mobile-nav.module.scss";

interface MobileNavProps {
  isRandomQuoteSectionVisible: boolean;
}

export const MobileNav: FC<MobileNavProps> = ({
  isRandomQuoteSectionVisible,
}) => {
  const navigate = useNavigate();

  const getMobileNavLinkClasses = ({ isActive }: NavLinkClassNameProps) => {
    return cn(styles.navLinkMobile, { [styles.activeMobile]: isActive });
  };

  return (
    <div className={styles.mobileMenu}>
      <ColorModeToggler />

      <Menu>
        <MenuItem onClick={() => navigate({ pathname: ROUTES.home.root() })}>
          <NavLink className={getMobileNavLinkClasses} to={ROUTES.home.root()}>
            Lista
          </NavLink>
        </MenuItem>

        <MenuItem onClick={() => navigate({ pathname: ROUTES.manage.root() })}>
          <NavLink
            className={getMobileNavLinkClasses}
            to={ROUTES.manage.root()}
          >
            Zarządzaj
          </NavLink>
        </MenuItem>

        {isRandomQuoteSectionVisible && (
          <MenuItem
            onClick={() => navigate({ pathname: ROUTES.randomQuote() })}
          >
            <NavLink
              className={getMobileNavLinkClasses}
              to={ROUTES.randomQuote()}
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
