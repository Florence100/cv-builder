import { Button } from './button';
import { RemoveIcon } from './icons/remove-icon';

export function RemoveButton({ value }: React.ComponentProps<'button'>) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="uppercase text-primary text-sm px-4 hover:opacity-80 hover:text-primary focus-visible:ring-primary"
    >
      <RemoveIcon className="size-6 mr-2" /> {value}
    </Button>
  );
}
