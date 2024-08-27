import { useForecast } from "@/hooks/use-forecast";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { getName } from "country-list";
import { formatDate } from "@/lib/format-date";
interface CurrentTempProps {
  temp: number;
  icon: string;
  city: string;
  country: string;
}

export const CurrentTemp = ({
  temp,
  icon,
  city,
  country,
}: CurrentTempProps) => {
  const { isCelsius, handleCelsius } = useForecast();
  const countryName = getName(country || "");
  return (
    <div className="flex flex-col md:flex-row items-center space-x-2 w-full justify-center md:justify-between">
      <div className="flex flex-row w-full justify-center md:justify-start items-center py-5">
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="weather icon"
        />
        <div className="flex flex-row items-center justify-between gap-1">
          <p className="text-4xl">{temp}</p>
          <Switch
            checked={isCelsius}
            onCheckedChange={(val) => handleCelsius(val)}
            id="airplane-mode"
            className="hidden"
          />
          <Label
            htmlFor="airplane-mode"
            className="text-gray-100 flex flex-row gap-1"
          >
            <button
              title="Celsius"
              className={`${
                isCelsius ? "scale-150 font-bold" : "font-normal text-xs"
              }`}
              onClick={() => handleCelsius(true)}
            >
              <TbTemperatureCelsius size={20} />
            </button>
            <div className="h-6 w-[1px] bg-white" />
            <button
              title="Fahrenheit"
              className={`${
                !isCelsius ? "scale-150 font-bold" : "font-normal text-xs"
              }`}
              onClick={() => handleCelsius(false)}
            >
              <TbTemperatureFahrenheit size={20} />
            </button>
          </Label>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-2 items-center">
          <IoLocationOutline size={16} />
          <div className="flex flex-row gap-1">
            <span className="font-semibold">{city},</span>
            <span className="font-semibold">{countryName}</span>
          </div>
        </div>
        <p className="text-[0.7rem]">
          {formatDate(new Date().toISOString()).dateWithTime}
        </p>
      </div>
    </div>
  );
};
