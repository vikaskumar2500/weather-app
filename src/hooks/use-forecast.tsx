import { useContext } from "react";
import { ForecastContext } from "@/context/forecast-provider";

export const useForecast = () => {
  const state = useContext(ForecastContext);
  if (!state) throw new Error("State is undefined");
  return state;
};
