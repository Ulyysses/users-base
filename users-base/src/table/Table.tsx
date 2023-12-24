import {
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  OnChangeFn,
  Row,
} from "@tanstack/react-table";
import css from "./index.module.css";
import { db } from "../app/App";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import IndeterminateCheckbox from "../indeterminate-checkbox";

interface UserData {
  checkbox: boolean;
  name: string;
  email: string;
  lastlogin: string;
  status: string;
}

interface ITable {
  setSelectedRows: OnChangeFn<RowSelectionState>;
  selectedRows: RowSelectionState;
}

const Table = ({ setSelectedRows, selectedRows }: ITable) => {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "users-base");
      const querySnapshot = await getDocs(collectionRef);
      const userData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data() as UserData);
      });
      setData(userData);
    };

    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: "checkbox",
      header: () => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: { row: Row<UserData> }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "lastlogin",
      header: "Last login",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows,
    },
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    onRowSelectionChange: setSelectedRows, 
  });

  return (
    <div className={css.table}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
