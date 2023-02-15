export const formatPrice = (number: number): string => {
  let numberString: string = number.toString();
  let separatedNumber: Array<string | number> = [];

  for (let i = numberString.length - 1; i >= 0; i -= 3) {
    separatedNumber.push(numberString.substring(i - 2, i + 1));
  }
  return separatedNumber.reverse().join(" ");
};
