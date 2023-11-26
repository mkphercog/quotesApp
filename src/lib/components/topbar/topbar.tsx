import { useGetQuotesListQuery } from "api/quotes";

import { MINIMUM_QUOTES_LIST_LENGTH } from "pages/random-quote-page/random-quote-page";

import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppName } from "./app-name/app-name";
import { DesktopNav } from "./desktop-nav/desktop-nav";
import { MobileNav } from "./mobile-nav/mobile-nav";

import styles from "./topbar.module.scss";

export const Topbar: FC = () => {
  const { quoteList } = useGetQuotesListQuery();

  const isRandomQuoteSectionVisible =
    Number(quoteList?.length) >= MINIMUM_QUOTES_LIST_LENGTH;

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
