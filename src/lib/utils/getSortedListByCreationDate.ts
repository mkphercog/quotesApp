export const getSortedListByCreationDate = <
  T extends { createdAt?: string | null }[]
>(
  list: T | undefined
) => {
  if (!list) return [];

  const sortedList = list.sort((itemA, itemB) => {
    const timeOfItemA = new Date(itemA.createdAt || "").getTime();
    const timeOfItemB = new Date(itemB.createdAt || "").getTime();

    return timeOfItemB - timeOfItemA;
  });

  return sortedList;
};
