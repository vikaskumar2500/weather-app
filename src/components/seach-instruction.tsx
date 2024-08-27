import { TbZoomQuestion } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { UseFormWatch } from "react-hook-form";

interface SearchInstructionProps {
  watch: UseFormWatch<any>;
}

export const SearchInstruction = ({ watch }: SearchInstructionProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          className={cn(
            "absolute outline-none right-5  top-[0.9rem] hover:scale-110",
            watch("search").length === 0 ? "block" : "hidden"
          )}
        >
          <button type="button">
            <TbZoomQuestion size={20} className="text-gray-700" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col max-w-xs text-xs text-muted-foreground">
          <p>
            If you want to search other country except India then you need to
            type the country name with city or zip code with , or emtpy space.
          </p>
          <p>eg: delhi, india or delhi india, 85xxxx, india or 85xxxx india.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
