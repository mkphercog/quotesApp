import { FC, ReactNode } from "react";
import styles from "./manage-page-rwd-wrapper.module.scss";

interface ManagePageRwdWrapperProps {
  addingSection: ReactNode;
  listSection: ReactNode;
}

export const ManagePageRwdWrapper: FC<ManagePageRwdWrapperProps> = ({
  addingSection,
  listSection,
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.listSection}>{listSection}</div>

      <div className={styles.addingSection}>{addingSection}</div>
    </section>
  );
};
