import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import header from "../assets/images/header.svg";
import css from "./index.module.css";
import { db } from "../app/App";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "users-base"); // Обратите внимание, что здесь нет дополнительного параметра для указания документа
      const querySnapshot = await getDocs(collectionRef);

      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });

      setData(userData);
    };

    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: "password",
      header: () => (
        <div className={css.checkBox_header_wrapper}>
          <img src={header} alt="Checkbox" className={css.checkBox_header} />
        </div>
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
    getCoreRowModel: getCoreRowModel(),
  });

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

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
