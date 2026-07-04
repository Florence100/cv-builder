import { cn } from '../lib/class-names';
import { Button } from './button';
import { AddIcon } from './icons/add-icon';

export function AddButton({ value, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn(
        'uppercase text-muted-foreground text-sm px-4 hover:opacity-80 hover:text-neutral-default focus-visible:ring-neutral-default',
        className
      )}
      {...props}
    >
      <AddIcon fill="rgba(118, 118, 118)" className="size-6 mr-2" /> {value}
    </Button>
  );
}
