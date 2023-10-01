import { Flex, Heading } from "@aws-amplify/ui-react";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../api/routes";

import styles from "./add-page.module.scss";

const getMobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return `${styles.navLink} ${isActive && styles.active}`;
};

export const AddPage = () => {
  return (
    <Flex direction="column" margin="20px 20px 0">
      <Heading textAlign="center" fontSize="20px" padding="10px">
        DODAJ
      </Heading>
      <Flex width="100%" justifyContent="center">
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
          Kategorię
        </NavLink>
      </Flex>
      <Outlet />
    </Flex>
  );
};
