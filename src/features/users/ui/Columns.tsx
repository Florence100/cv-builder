'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { User } from 'cv-graphql';
import Image from 'next/image';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'profile.avatar',
    header: '',
    cell: ({ row }) => {
      console.log(row);
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
          // placeholder="blur"
          className="rounded-full h-10 w-10 object-cover"
        />
      );
    },
  },
  {
    accessorKey: 'profile.first_name',
    header: () => <div className="text-left">First Name</div>,
  },
  {
    accessorKey: 'profile.last_name',
    header: () => <div className="text-left">Last Name</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className="text-left">Email</div>,
  },
  {
    accessorKey: 'department_name',
    header: () => <div className="text-left">Department</div>,
  },
  {
    accessorKey: 'position_name',
    header: () => <div className="text-left">Position</div>,
  },
];
