'use client';

import { useUsers } from '../api/api';
import { useEffect } from 'react';
import { columns } from './Columns';
import { DataTable } from './DataTable';

export const UsersTable = () => {
  const [fetchUsers, { data, loading, error }] = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    console.log(error);
    // return <>Error</>;
  }

  const usersList = data?.users || [];

  return (
    <div className="w-full mx-auto lg:container">
      {/* <div className="mx-auto container"> */}
      <DataTable columns={columns} data={usersList} />
    </div>
  );
};
