import * as React from 'react';
import { Input } from '@/src/shared/ui/input';
import { cn } from '@/src/shared/lib/class-names';

type FloatingInputProps = React.ComponentProps<'input'> & {
  label: string;
};

export function FloatingInput({ label, id, className, ...props }: FloatingInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="relative w-full">
      <Input
        id={inputId}
        placeholder=" "
        className={cn(
          'h-12 p-3 text-base placeholder:text-base bg-transparent border-border rounded-none outline-none hover:border-border-hovered peer',
          className
        )}
        {...props}
      />

      <label
        htmlFor={inputId}
        className="
          pointer-events-none
          absolute left-3 top-1/2
          -translate-y-1/2
          text-base text-muted-foreground
          transition-all duration-200
          origin-left

          peer-focus:top-0
          peer-focus:text-sm
          peer-focus:text-primary
          peer-focus:bg-background
          peer-focus:p-1

          peer-[&:not(:placeholder-shown)]:top-0
          peer-[&:not(:placeholder-shown)]:text-sm
          peer-[&:not(:placeholder-shown)]:bg-background
          peer-[&:not(:placeholder-shown)]:p-1
        "
      >
        {label}
      </label>
    </div>
  );
}
