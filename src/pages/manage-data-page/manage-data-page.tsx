import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../api/routes";
import cn from "classnames";

import styles from "./manage-data-page.module.scss";

const getMobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return cn(styles.navLink, { [styles.active]: isActive });
};

export const ManageDataPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navWrapper}>
        <NavLink
          className={getMobileNavLinkClasses}
          to={ROUTES.manage.addQuote}
        >
          Cytat
        </NavLink>
        <NavLink className={getMobileNavLinkClasses} to={ROUTES.manage.source}>
          Źródło
        </NavLink>
        <NavLink className={getMobileNavLinkClasses} to={ROUTES.manage.tag}>
          Kategoria
        </NavLink>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
