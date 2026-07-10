'use client';

import { useState } from 'react';
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
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { SearchInput } from '@/src/shared/ui/search-input';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import type { CvProject } from 'cv-graphql';
import { Badge } from '@/src/shared/ui/badge';

interface CvProjectTableProps {
  columns: ColumnDef<CvProject>[];
  data: CvProject[];
}

export function CvProjectTable({ columns, data }: CvProjectTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const t = useTranslations('entities.cvProject.table');

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
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 pl-4">
        <SearchInput
          placeholder={t('searchPlaceholder')}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
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
              table.getRowModel().rows.map((row) => {
                return (
                  <Fragment key={row.id}>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="border-b-0 hover:bg-transparent"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell className="p-4" key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b-0">
                      <TableCell colSpan={row.getVisibleCells().length} className="px-4 py-2">
                        <div className="text-sm text-muted-foreground whitespace-normal break-words">
                          {row.original.description}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={row.getVisibleCells().length} className="px-4 py-2">
                        <div className="flex gap-2">
                          {row.original.responsibilities.map((responsibility, index) => (
                            <Badge
                              variant="secondary"
                              key={index}
                              className="bg-neutral-default text-white"
                            >
                              {responsibility}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })
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
