import { Flex, Heading } from "@aws-amplify/ui-react";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../api/routes";

import "./add-page.css";

export const AddPage = () => {
  return (
    <Flex direction="column" margin="20px 20px 0">
      <Heading textAlign="center" fontSize="20px" padding="10px">
        DODAJ
      </Heading>
      <Flex width="100%" justifyContent="center">
        <NavLink className="nav_link" to={ROUTES.manage.addQuote}>
          Cytat
        </NavLink>
        <NavLink className="nav_link" to={ROUTES.manage.source}>
          Źródło
        </NavLink>
        <NavLink className="nav_link" to={ROUTES.manage.tag}>
          Kategorię
        </NavLink>
      </Flex>
      <Outlet />
    </Flex>
  );
};
