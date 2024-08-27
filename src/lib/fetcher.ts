import axios from "axios";
import { getCode } from "country-list";

export enum Type {
  "FORECAST" = "forecast",
  "WEATHER" = "weather",
}

interface FetcherProps {
  type?: Type;
  zip?: string | null;
  city?: string | null;
  country?: string;
  lat?: number | null;
  lon?: number | null;
}

export const fetcher = async ({
  type = Type.WEATHER,
  zip,
  country = "india",
  city,
  lat,
  lon,
}: FetcherProps) => {
  const code = getCode(country.toLowerCase());
  let flag = false;
  let apiURL = `${import.meta.env.VITE_FORECAST_END_POINT}/${type}?`;
  if (lat && lon) {
    apiURL += `&lat=${lat}&lon=${lon}`;
    flag = true;
  } else if (city) {
    apiURL += `&q=${city}`;
    flag = true;
  } else if (zip) {
    apiURL += `&zip=${zip},${code}`;
    flag = true;
  }
  apiURL += `&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

  if (!flag) throw new Error("Something went wrong");
  return await axios(apiURL);
};
