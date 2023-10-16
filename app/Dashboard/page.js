"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";

import axios from "axios";
import Tablerow from "../components/Tablerow";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    axios.get("http://localhost:3000/api/Register_barang").then((item) => {
      setData(item.data);
    });
  }, []);
  return (
    <>
      {session && session.user.account_type === "admin" ? (
        <div className="p-5">
          <h1>Warehouse Stock Dashboard</h1>
          <Link href={"/Dashboard/Additem"}>add new item</Link>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>Number</th>
                <th>Nama barang</th>
                <th>Harga barang</th>
                <th>Stock barang</th>
                <th>Deskripsi barang</th>
                <th>Gambar barang</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <>
                      <Tablerow data={item} index={index} />
                    </>
                  );
                })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h1 className=" text-center bg-red-800 text-white">hanya admin</h1>
      )}
    </>
  );
}
