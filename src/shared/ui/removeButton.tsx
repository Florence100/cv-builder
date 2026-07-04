import { cn } from '../lib/class-names';
import { Button } from './button';
import { RemoveIcon } from './icons/remove-icon';

export function RemoveButton({ value, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn(
        'uppercase text-primary text-sm px-4 hover:opacity-80 hover:text-primary focus-visible:ring-primary',
        className
      )}
      {...props}
    >
      <RemoveIcon className="size-6 mr-2" /> {value}
    </Button>
  );
}
