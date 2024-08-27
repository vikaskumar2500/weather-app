import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const Loading = () => {
  return (
    <div className="flex flex-row gap-1">
      <AiOutlineLoading3Quarters className="animate-spin text-white" />
      <p className="text-white">Loading...</p>
    </div>
  );
};
