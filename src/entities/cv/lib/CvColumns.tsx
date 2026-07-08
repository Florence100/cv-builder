'use client';

import { Button } from '@/src/shared/ui/button';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Cv } from 'cv-graphql';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CvPopover } from '../ui/CvPopover';

interface CvT extends Cv {
  isCurrentUserCv: boolean;
}

const HeaderWithTranslation = ({
  column,
  translationKey,
}: {
  column: Column<CvT, unknown>;
  translationKey: string;
}) => {
  const t = useTranslations('entities.cv.cvsTable');
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

export const cvColumns: ColumnDef<CvT>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="name" />,
  },
  {
    accessorKey: 'education',
    id: 'education',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="education" />,
  },
  {
    accessorKey: 'user.email',
    id: 'email',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="employee" />,
  },
  {
    accessorKey: 'id',
    id: 'id',
    header: '',
    cell: ({ row }) => {
      const id = row.original.id;
      return row.original.isCurrentUserCv ? (
        <CvPopover cvId={id} />
      ) : (
        <Button variant="ghost" className="w-12" aria-label="See the options">
          <Link href={`/users/${id}/profile`}>
            <ChevronRight color="gray" className="size-6" />
          </Link>
        </Button>
      );
    },
  },
];
