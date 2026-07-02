'use client';

import { GET_USER } from '@/src/entities/user/api/queries';
import { useSidebar } from '@/src/shared/ui/sidebar';
import { useQuery } from '@apollo/client/react';
import Cookies from 'js-cookie';
import Image from 'next/image';

export function UserButton() {
  const { open } = useSidebar();

  const userId = Cookies.get('userId');

  const { data } = useQuery(GET_USER, {
    variables: { userId: userId ?? '' },
    skip: !userId,
  });

  const avatar = data?.user?.profile?.avatar || null;
  const fullName = data?.user?.profile?.full_name || 'User Name';
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <button className="flex gap-2 items-center">
      {avatar ? (
        <Image
          src={avatar}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full h-10 w-10 object-cover"
        />
      ) : (
        <p className="shrink-0 rounded-full w-10 h-10 bg-primary flex items-center justify-center text-white text-xl font-medium">
          {initial}
        </p>
      )}

      <p className={`text-left truncate w-32 ${open ? 'block' : 'hidden'}`}>{fullName}</p>
    </button>
  );
}
