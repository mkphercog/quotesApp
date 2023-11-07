import { FC, PropsWithChildren } from "react";
import { Heading, Loader, Text } from "@aws-amplify/ui-react";

import styles from "./manage-list-wrapper.module.scss";

type ManageListWrapperProps = PropsWithChildren<{
  isLoading: boolean;
  isEmptyList: boolean;
}>;

export const ManageListWrapper: FC<ManageListWrapperProps> = ({
  isEmptyList,
  isLoading,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <Heading className={styles.heading}>
        Lista dostępnych {isLoading && <Loader />}
      </Heading>

      {isEmptyList && <Text>Lista jest pusta.</Text>}

      {!isEmptyList && children}
    </div>
  );
};
