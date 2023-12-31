interface GetRandomNumberParams {
  min: number;
  max: number;
}

type GetRandomNumberFunctionType = (params: GetRandomNumberParams) => {
  getRandomNumber: () => number;
};

export const getRandomNumberFunction: GetRandomNumberFunctionType = (
  params
) => {
  const { min, max } = params;
  let usedNums: number[] = [];

  const getRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    const isRandomNumInUsedNums = usedNums.includes(randomNum);

    const isUsedNumsFull = usedNums.length === max - min;
    const isRandomNumSameAsLastItemOfUsedNums =
      isUsedNumsFull && randomNum === usedNums[usedNums.length - 1];

    if (min >= max) {
      console.error(
        `Min value (${min}) is greater than or equals max (${max}).`
      );
      return 0;
    }

    if (max - min <= 1) {
      console.error(
        `Range (${
          max - min
        }) between min and max is to small. Minimum avaliable range is 2.`
      );
      return 0;
    }

    if (isRandomNumSameAsLastItemOfUsedNums) {
      getRandomNumber();
    } else if (isUsedNumsFull) {
      usedNums = [];
      usedNums.push(randomNum);
    } else if (isRandomNumInUsedNums) {
      getRandomNumber();
    } else {
      usedNums.push(randomNum);
    }

    return usedNums[usedNums.length - 1];
  };

  return { getRandomNumber };
};
