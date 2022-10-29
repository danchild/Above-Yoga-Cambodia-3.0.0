export interface Daily {
  weather: { icon: string }[];
  temp: {
    min: number,
    max: number,
  };
}
