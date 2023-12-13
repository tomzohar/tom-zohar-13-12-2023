export type WeatherUnit = 'C' | 'F';

export interface TemperatureValue {
  Value: number;
  Unit: WeatherUnit;
  UnitType: number;
}

export interface WeatherBase {
  EpochTime: number;
  MobileLink: string;
  Link: string;
}

export interface DayTime {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface ForecastWeatherDto extends WeatherBase {
  Date: string; // "2023-12-17T07:00:00+02:00",
  Temperature: {
    Minimum: TemperatureValue;
    Maximum: TemperatureValue;
  };
  Day: DayTime;
  Night: DayTime;
  Sources: string[];
}

export interface MultiForecastHeadline {
  Text: string;
  Category: string;
  EffectiveDate: string; //"2023-12-13T19:00:00+02:00"
  EffectiveEpochDate: number; //1702486800 ?? timestamp ??
  EndDate: string; //"2023-12-14T01:00:00+02:00"
  EndEpochDate: number; // ?? 1702508400 timestamp ??
  Link: string;
  MobileLink: string;
  Severity: number;
}

export interface MultiDayForecast {
  DailyForecasts: ForecastWeatherDto[];
  Headline: MultiForecastHeadline;
}

export interface CurrentTemperature {
  Metric: TemperatureValue;
  Imperial: TemperatureValue;
}

export interface CurrentWeatherDto extends WeatherBase {
  LocalObservationDateTime: string; //"2023-12-13T21:22:00+02:00",
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null;
  IsDayTime: boolean;
  Temperature: CurrentTemperature;
}

export interface WeatherLocationArea {
  ID: 'TA',
  LocalizedName: 'Tel Aviv'
}

export interface WeatherLocationDto {
  AdministrativeArea: WeatherLocationArea;
  Country: WeatherLocationArea;
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: number;
}
