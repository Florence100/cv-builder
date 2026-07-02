'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table';
import { SearchInput } from '@/src/shared/ui/search-input';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UserTable<TData, TValue>({ columns, data }: UserTableProps<TData, TValue>) {
  const tSearch = useTranslations('shared.ui.searchFullNameInput');
  const t = useTranslations('entities.user');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const isLessThan1280 = useMediaQuery({ maxWidth: 1280 });
  const isLessThan1024 = useMediaQuery({ maxWidth: 1024 });

  const columnVisibility = {
    full_name: false,
    email: !isLessThan1280,
    last_name: !isLessThan1024,
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: columnVisibility,
    },
  });

  return (
    <div>
      <h1 className="pt-4 pl-4 text-muted-foreground">{t('title')}</h1>
      <div className="flex items-center py-4 pl-4">
        <SearchInput
          placeholder={tSearch('placeholder')}
          value={(table.getColumn('full_name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('full_name')?.setFilterValue(event.target.value)}
        />
      </div>
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="p-4 pb-5 pt-5" key={header.id}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell className="p-4" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
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
}
