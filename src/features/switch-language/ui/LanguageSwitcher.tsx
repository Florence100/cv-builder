import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';

export const LanguageSwitcher = () => {
  return (
    <Select>
      <SelectTrigger className="h-12 w-full bg-background border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectItem value={'en'} className="bg-background focus:bg-select-item">
          English
        </SelectItem>
        <SelectItem value={'ru'} className="bg-background focus:bg-select-item">
          Russian
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
