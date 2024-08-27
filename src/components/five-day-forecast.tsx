import { useForecast } from "@/hooks/use-forecast";

import { Type, useFetcher } from "@/hooks/use-fetcher";
import { useMemo } from "react";
import { TiWeatherCloudy } from "react-icons/ti";
import { Loading } from "./loading";
import { formatDate } from "@/lib/format-date";

interface ForecastDataProps {
  date: string;
  icon: string;
  desc: string;
  temp_avg: number;
}

const FiveDayForecast = () => {
  const { isCelsius, searchProps } = useForecast();

  const { data, error, isLoading } = useFetcher({
    ...searchProps,
    type: Type.FORECAST,
  });
  const mappedData: ForecastDataProps[] = useMemo(
    () =>
      data[0]?.list
        ?.filter((item: any) => item.dt_txt.includes("09:00:00"))
        .map((item: any) => ({
          date: item.dt_txt,
          desc: item.weather[0].description,
          icon: item.weather[0].icon,
          temp_avg: +((item.main.temp_max + item.main.temp_min) / 2),
        })) || [],
    [data, searchProps]
  );

  if (error) return null;

  return (
    <ul className="flex flex-wrap gap-5 items-center justify-center text-transparent/30">
      {!isLoading &&
        mappedData.map(({ date, desc, icon, temp_avg }, idx) => (
          <li
            key={idx}
            className="flex flex-row items-center justify-between border-1 border-emerald-600 rounded-lg p-6 h-[5rem] w-full max-w-xl hover:scale-105 transition-transform duration-300 border bg-emerald-900/80 text-white"
          >
            <p className="text-xs font-semibold">
              {formatDate(date).dateWithoutTime}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${icon}.png`}
              alt={`${desc} icon`}
              className="w-16 h-16"
            />
            <div className="flex flex-row gap-2 items-center">
              <TiWeatherCloudy size={20} className="hidden md:block" />
              <p className="text-xs capitalize text-center">{desc}</p>
            </div>

            <p className="text-lg font-semibold">
              {isCelsius
                ? `${temp_avg.toFixed(2)}`
                : `${(temp_avg * 1.8 + 32).toFixed(2)}`}
            </p>
          </li>
        ))}
      {isLoading && <Loading />}
    </ul>
  );
};

export default FiveDayForecast;
