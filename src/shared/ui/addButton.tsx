import { Button } from './button';
import { AddIcon } from './icons/add-icon';

export function AddButton({ value }: React.ComponentProps<'button'>) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="uppercase text-neutral-default text-sm px-4 hover:opacity-80 hover:text-neutral-default focus-visible:ring-neutral-default"
    >
      <AddIcon fill="rgba(118, 118, 118)" className="size-[1.5rem] mr-2" /> {value}
    </Button>
  );
}
