import { cn } from '../lib/class-names';
import { Button } from './button';
import { AddIcon } from './icons/add-icon';

export function CreateButton({ value, className, ...props }: React.ComponentProps<'button'>) {
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
      <AddIcon fill="rgba(198, 48, 49, 1)" className="size-6 mr-2" /> {value}
    </Button>
  );
}
