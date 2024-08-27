import { createContext, useEffect, useState } from "react";

interface ForecastProviderProps {
  children: React.ReactNode;
}
interface ForecastProps {
  isCelsius: boolean;
  handleCelsius: (isTrue: boolean) => void;
  searchProps: SearchProps | null;
  handleSearchProps: (data: SearchProps) => void;
}
interface SearchProps {
  zip?: string | null;
  city?: string | null;
  country?: string;
  lat?: number | null;
  lon?: number | null;
}

export const ForecastContext = createContext<ForecastProps>({
  isCelsius: true,
  handleCelsius: () => {},
  searchProps: null,
  handleSearchProps: () => {},
});

const ForecastProvider = ({ children }: ForecastProviderProps) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [searchProps, setSearchProps] = useState<SearchProps | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      handleSearchProps({
        lat: Number(pos.coords.latitude.toFixed(2)),
        lon: Number(pos.coords.longitude.toFixed(2)),
      });
    });
    return () => {
      navigator.geolocation.clearWatch;
    };
  }, []);
  const handleCelsius = (isTrue: boolean) => setIsCelsius(isTrue);
  const handleSearchProps = (data: SearchProps) => setSearchProps(data);
  console.log("searchprops ", searchProps);
  return (
    <ForecastContext.Provider
      value={{ isCelsius, handleCelsius, handleSearchProps, searchProps }}
    >
      {children}
    </ForecastContext.Provider>
  );
};

export default ForecastProvider;
