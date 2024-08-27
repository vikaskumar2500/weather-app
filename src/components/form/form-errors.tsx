import { XCircle } from "lucide-react";
import { FieldError } from "react-hook-form";

interface FormErrorsProps {
  id: string;
  errors?: FieldError | undefined;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="text-xs text-rose-500 absolute -bottom-[18px] left-0"
    >
      {errors && (
        <div className="flex items-center rounded-md font-medium text-rose-500">
          <XCircle className="w-4 h-4 mr-2" />
          {errors.message}
        </div>
      )}
    </div>
  );
};
