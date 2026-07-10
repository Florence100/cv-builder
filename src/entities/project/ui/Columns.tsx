'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { CvProject } from 'cv-graphql';
import { Button } from '@/src/shared/ui/button';
import { useTranslations } from 'next-intl';
import { Column } from '@tanstack/react-table';
import { ArrowDown } from 'lucide-react';
import { PopoverDemo } from './Popover';

const SortedHeaderWithTranslation = ({
  column,
  translationKey,
}: {
  column: Column<CvProject, unknown>;
  translationKey: string;
}) => {
  const t = useTranslations('entities.cvProject.table');

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

const HeaderWithTranslation = ({
  translationKey,
}: {
  column: Column<CvProject, unknown>;
  translationKey: string;
}) => {
  const t = useTranslations('entities.cvProject.table');

  return <p>{t(translationKey)}</p>;
};

export const columns: ColumnDef<CvProject>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => <SortedHeaderWithTranslation column={column} translationKey="name" />,
  },
  {
    accessorKey: 'domain',
    id: 'domain',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="domain" />,
  },
  {
    accessorKey: 'start_date',
    id: 'start_date',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="startDate" />,
  },
  {
    accessorKey: 'end_date',
    id: 'end_date',
    header: ({ column }) => <HeaderWithTranslation column={column} translationKey="endDate" />,
  },
  {
    accessorKey: 'id',
    id: 'id',
    header: '',
    cell: () => {
      return <PopoverDemo />;
    },
  },
];
