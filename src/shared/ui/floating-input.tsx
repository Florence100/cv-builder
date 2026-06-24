import { useId, ComponentProps } from 'react';
import { Input } from '@/src/shared/ui/input';
import { cn } from '@/src/shared/lib/class-names';

type FloatingInputProps = ComponentProps<'input'> & {
  label: string;
  isError?: boolean;
};

export function FloatingInput({ label, isError, id, className, ...props }: FloatingInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="relative w-full">
      <Input
        id={inputId}
        placeholder={props.placeholder ?? ' '}
        className={cn(
          'h-12 p-3 text-base placeholder:text-base bg-transparent border-border rounded-none outline-none hover:border-border-hovered peer',
          isError && 'border-primary hover:border-primary',
          className
        )}
        {...props}
      />

      <label
        htmlFor={inputId}
        className={cn(
          `pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 origin-left
          peer-focus:top-0 peer-focus:text-sm peer-focus:bg-background peer-focus:p-1
          peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:p-1
          peer-autofill:top-0 peer-autofill:text-sm peer-autofill:bg-background peer-autofill:p-1`,
          isError ? 'text-primary' : 'text-muted-foreground peer-focus:text-primary'
        )}
      >
        {label}
      </label>
    </div>
  );
}
