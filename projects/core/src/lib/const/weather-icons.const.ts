export const getIcon = (number: number) => {
  number = number < 10 ? `0${number}` : number as any;
  return `https://developer.accuweather.com/sites/default/files/${number}-s.png`;
}
