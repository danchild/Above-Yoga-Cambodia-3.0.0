export interface WeatherData {
  daily: {
    weather: { icon: string, description: string }[],
    temp: {
      min: number,
      max: number,
    }
  }[];
  hourly: {
    weather: { icon: string, description: string }[]
  }[];
  current: {
    feels_like: number,
    sunrise: number,
    sunset: number,
    temp: number,
    humidity: number,
    uvi: number,
    weather: {
      icon: string,
      description: string,
    }[]
  };
}
