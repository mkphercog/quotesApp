import { useQueryClient } from "@tanstack/react-query";
import { useGetQuotesListQuery } from "api/quotes";

import { MINIMUM_QUOTES_LIST_LENGTH } from "pages/random-quote-page/random-quote-page";

import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AppName } from "./app-name/app-name";
import { DesktopNav } from "./desktop-nav/desktop-nav";
import { MobileNav } from "./mobile-nav/mobile-nav";

import styles from "./topbar.module.scss";

export const Topbar: FC = () => {
  const { quoteList } = useGetQuotesListQuery();

  const queryClient = useQueryClient();
  const isRandomQuoteSectionVisible =
    Number(quoteList?.length) >= MINIMUM_QUOTES_LIST_LENGTH;

  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries();
      queryClient.removeQueries();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className={styles.navWrapper}>
        <AppName />

        <DesktopNav isRandomQuoteSectionVisible={isRandomQuoteSectionVisible} />

        <MobileNav isRandomQuoteSectionVisible={isRandomQuoteSectionVisible} />
      </nav>
      <Outlet />
    </>
  );
};
