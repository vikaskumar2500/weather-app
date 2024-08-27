import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: FieldError | undefined;
  className?: string;
  defaultValue?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, className, defaultValue, errors, label, ...props }, ref) => {
    return (
      <div className="relative space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label htmlFor={id} className="font-semibold text-neutral-700">
              {label}
            </Label>
          ) : null}
          <Input
            defaultValue={defaultValue}
            ref={ref}
            name={id}
            id={id}
            {...props}
            className={cn("text-sm px-2 py-1 h-9", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        {errors ? <FormErrors id={id} errors={errors} /> : null}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
