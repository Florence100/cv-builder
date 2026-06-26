'use client';

import { useSidebar } from '@/src/shared/ui/sidebar';

export function UserButton() {
  const { open } = useSidebar();

  return (
    <button className="flex gap-2 items-center">
      <p className="rounded-full w-10 h-10 bg-primary flex items-center justify-center text-white text-xl font-medium">
        U
      </p>
      <p className={`text-left truncate w-32 ${open ? 'block' : 'hidden'}`}>User Name</p>
    </button>
  );
}
