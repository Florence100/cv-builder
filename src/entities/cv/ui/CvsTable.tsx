'use client';

import { CreateCvModal } from '@/src/features/create-cv';
import { SearchInput } from '@/src/shared/ui/search-input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface CvTableProps<TData extends { description?: string | null }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentUserId: string;
}

export const CvsTable = <TData extends { description?: string | null }, TValue>({
  columns,
  data,
  currentUserId,
}: CvTableProps<TData, TValue>) => {
  const t = useTranslations('entities.cv.cvsTable');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const isLessThan1024 = useMediaQuery({ maxWidth: 1024 });

  const columnVisibility = {
    education: !isLessThan1024,
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const name = (row.getValue('name') as string) || '';
      const description = row.original.description || '';
      const searchValue = String(filterValue).toLowerCase();

      return (
        name.toLowerCase().includes(searchValue) || description.toLowerCase().includes(searchValue)
      );
    },
    state: {
      sorting,
      globalFilter,
      columnVisibility: columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4 pl-5">
        <SearchInput
          placeholder={t('searchPlaceholder')}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
        <CreateCvModal userId={currentUserId} />
      </div>
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={`p-4 py-5 ${header.column.id === 'id' ? 'w-0' : ''}`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className="border-b-0 hover:bg-transparent"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell className="p-4 pb-2" key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={row.getVisibleCells().length}
                      className="px-4 pb-6 pt-0 text-base text-foreground opacity-60 max-w-0 wrap-break-word whitespace-pre-wrap"
                    >
                      {row.original.description || 'No description available.'}
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
