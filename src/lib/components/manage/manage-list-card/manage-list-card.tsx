import { FC, PropsWithChildren } from "react";

import cn from "classnames";
import styles from "./manage-list-card.module.scss";

type ManageListCardProps = PropsWithChildren<{
  itemData: {
    id: string;
  };
  currentId: string | null;
  className?: string;
}>;

export const ManageListCard: FC<ManageListCardProps> = ({
  itemData,
  currentId,
  children,
  className,
}) => {
  const isCurrentItemSelected = itemData.id === currentId;

  return (
    <div
      className={cn(
        styles.wrapper,
        {
          [styles.activeWrapper]: isCurrentItemSelected,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
