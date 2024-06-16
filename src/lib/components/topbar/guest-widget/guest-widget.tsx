import { useState } from "react";
import { Text } from "@aws-amplify/ui-react";
import { useSession } from "lib/providers/session/session.hooks";

import cn from "classnames";
import styles from "./guest-widget.module.scss";

export const GuestWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentGuestActions, isGuestLogged } = useSession();

  const toggle = () => {
    setIsOpen((state) => !state);
  };

  if (!isGuestLogged) return null;

  return (
    <aside
      className={cn(styles.guestInfoWidget, {
        [styles.guestInfoWidgetOpen]: isOpen,
      })}
    >
      <div className={styles.hintWrapper} onClick={toggle}>
        <Text className={styles.hint}>
          Jesteś zalogowany na koncie demonstracyjnym. Konto to posiada
          ograniczenia ilościowe w zakresie dodawania, usuwania oraz edycji
          treści na stronie. Udostępniam to konto jedynie w celu umożliwienia
          zapoznania się ze stroną i jej funkcjonalnościami dla przyszłych
          rekrutacji, ponieważ jest to projekt do mojego portfolio.
        </Text>
      </div>
      <div className={styles.counterWrapper} onClick={toggle}>
        <Text className={styles.counter}>{currentGuestActions}</Text>
      </div>
    </aside>
  );
};
