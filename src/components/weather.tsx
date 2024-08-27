import { Type } from "@/hooks/use-fetcher";
import { useForecast } from "@/hooks/use-forecast";
import { useEffect, useMemo, useState } from "react";
import { CurrentTemp } from "./current-temp";
import { Loading } from "./loading";
import { getWindDirection } from "@/lib/wind-direction";
import { fetcher } from "@/lib/fetcher";

const Weather = () => {
  const { isCelsius, searchProps } = useForecast();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetcher({
          ...searchProps,
          type: Type.WEATHER,
        });
        const data = res.data;
        setData(() => [data]);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchProps]);

  const weatherData = useMemo(
    () => [
      {
        name: "Feels Like",
        value: isCelsius
          ? data[0]?.main.feels_like
          : (data[0]?.main.temp * 1.8 + 32).toFixed(2),
      },
      {
        name: "Temp Min",
        value: isCelsius
          ? data[0]?.main.temp_min
          : (data[0]?.main.temp_min * 1.8 + 32).toFixed(2),
      },
      {
        name: "Temp Max",
        value: isCelsius
          ? data[0]?.main.temp_max
          : (data[0]?.main.temp_max * 1.8 + 32).toFixed(2),
      },

      { name: "Wind Speed", value: `${data[0]?.wind.speed} m/s` },
      {
        name: "Wind Direction",
        value: `${getWindDirection(data[0]?.wind.deg)}°`,
      },
      {
        name: "Weather Description",
        value: data[0]?.weather?.[0]?.description || "N/A",
      },
    ],
    [data, isCelsius]
  );

  const temp = isCelsius
    ? data[0]?.main.temp
    : (data[0]?.main.temp * 1.8 + 32).toFixed(2);

  if (error) return null;

  return (
    <>
      {!isLoading && (
        <div className="md:p-10 text-gray-50 w-full">
          <CurrentTemp
            country={data[0]?.sys.country}
            city={data[0]?.name}
            temp={temp}
            icon={data[0]?.weather[0].icon}
          />
          <ul className="flex flex-col gap-1 justify-between md:max-w-xs mx-auto w-full p-10 rounded-md bg-emerald-900/80 mt-10">
            {weatherData.map((data, idx) => (
              <li
                key={idx}
                className="flex flex-row items-center justify-between"
              >
                <p className="text-muted">{data?.name}</p>
                <span className="font-semibold">{data?.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isLoading && (
        <div className="md:p-10 text-gray-200">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Weather;
