import axios from "axios";
import { getCode } from "country-list";
import { useEffect, useState } from "react";
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

export const useFetcher = ({
  type = Type.WEATHER,
  zip,
  country = "india",
  city,
  lat,
  lon,
}: FetcherProps) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
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
        const res = await axios(apiURL);

        if (res.status !== 200)
          throw new Error("Something went wrong, please try again later!");
        setData(() => [res.data]);
        setError(null);
      } catch (e: any) {
        setData([]);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [lat, lon, type, city, zip, country]);
  return { isLoading, data, error };
};
