export const ROUTES = {
  home: {
    root: () => "/",
    back: () => -1,
  },
  manage: {
    root: () => "/manage",
    addQuote: () => "/manage/addQuote",
    editQuoteRoot: () => "/manage/editQuote/:id",
    editQuote: (id: string) => `/manage/editQuote/${id}`,
    source: () => "/manage/source",
    tag: () => "/manage/tag",
  },
  randomQuote: () => "randomQuote",
  other: "*",
};
