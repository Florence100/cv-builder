'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { User } from 'cv-graphql';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/src/shared/ui/button';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'profile.avatar',
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
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="p-0 hover:bg-background hover:text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
          {isSorted && (
            <ArrowDown
              className={`ml-1 h-[4.5rem] w-[4.5rem] transition-transform duration-200 ${
                isSorted === 'asc' ? 'rotate-180' : ''
              }`}
            />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'profile.last_name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="p-0 hover:bg-background hover:text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Name
          {isSorted && (
            <ArrowDown
              className={`ml-1 h-[4.5rem] w-[4.5rem] transition-transform duration-200 ${
                isSorted === 'asc' ? 'rotate-180' : ''
              }`}
            />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="p-0 hover:bg-background hover:text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          {isSorted && (
            <ArrowDown
              className={`ml-1 h-[4.5rem] w-[4.5rem] transition-transform duration-200 ${
                isSorted === 'asc' ? 'rotate-180' : ''
              }`}
            />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'department_name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="p-0 hover:bg-background hover:text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Department
          {isSorted && (
            <ArrowDown
              className={`ml-1 h-[4.5rem] w-[4.5rem] transition-transform duration-200 ${
                isSorted === 'asc' ? 'rotate-180' : ''
              }`}
            />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'position_name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="p-0 hover:bg-background hover:text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Position
          {isSorted && (
            <ArrowDown
              className={`ml-1 h-[4.5rem] w-[4.5rem] transition-transform duration-200 ${
                isSorted === 'asc' ? 'rotate-180' : ''
              }`}
            />
          )}
        </Button>
      );
    },
  },
  {
    id: 'full_name',
    accessorFn: (row) => row.profile.full_name,
  },
];
