'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import type { User } from 'cv-graphql';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/src/shared/ui/button';
import { ChevronRight } from 'lucide-react';
import { PopoverDemo } from './Popover';
import { useTranslations } from 'next-intl';
import { Column } from '@tanstack/react-table';

interface UserT extends User {
  isCurrentUser: boolean;
}

const HeaderWithTranslation = ({
  column,
  translationKey,
}: {
  column: Column<UserT, unknown>;
  translationKey: string;
}) => {
  const t = useTranslations('entities.user.table');

  const isSorted = column.getIsSorted();

  return (
    <Button
      className="p-0 hover:bg-background hover:text-primary"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {t(translationKey)}
      {isSorted && (
        <ArrowDown
          className={`ml-1 h-18 w-18 transition-transform duration-200 ${
            isSorted === 'asc' ? 'rotate-180' : ''
          }`}
        />
      )}
    </Button>
  );
};

export const columns: ColumnDef<UserT>[] = [
  {
    accessorKey: 'profile.avatar',
    id: 'avatar',
    header: '',
    cell: ({ row }) => {
      const avatarUrl = row.original.profile?.avatar;

      if (!avatarUrl)
        return (
          <div className="flex rounded-full w-10 h-10 bg-table-avatar text-background items-center justify-center text-xl font-normal">
            {row.original.email[0].toUpperCase()}
          </div>
        );

      return (
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full h-10 w-10 object-cover"
        />
      );
    },
  },
  {
    accessorKey: 'profile.first_name',
    id: 'first_name',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="firstName" />,
  },
  {
    accessorKey: 'profile.last_name',
    id: 'last_name',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="lastName" />,
  },
  {
    accessorKey: 'email',
    id: 'email',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="email" />,
  },
  {
    accessorKey: 'department_name',
    id: 'department_name',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="department" />,
  },
  {
    accessorKey: 'position_name',
    id: 'position_name',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="position" />,
  },
  {
    accessorKey: 'id',
    id: 'id',
    header: '',
    cell: ({ row }) => {
      const id = row.original.id;
      return row.original.isCurrentUser ? (
        <PopoverDemo id={id} />
      ) : (
        <Button variant="ghost" className="w-12" aria-label="See the options">
          <Link href={`/users/${id}/profile`}>
            <ChevronRight color="gray" className="size-6" />
          </Link>
        </Button>
      );
    },
  },
  {
    id: 'full_name',
    accessorFn: (row) => row.profile.full_name,
  },
];
