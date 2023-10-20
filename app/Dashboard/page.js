"use client";
import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/joy/Table";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

import axios from "axios";
import Tablerow from "../components/Tablerow";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [data, setData] = useState();
  const [base64String, setBase64String] = useState("");
  console.log("hasil convert : ", base64String, typeof base64String);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  console.log(data);
  useEffect(() => {
    axios.get("/api/Register_barang").then((item) => {
      setData(item.data);
    });
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      {session && session.user.account_type === "admin" ? (
        <div className="p-5">
          <h1 className="  text-center text-lg mb-10 mt-10">
            Warehouse Stock Dashboard
          </h1>

          <div className=" flex justify-end mr-20 mb-5 gap-10">
            <Link href={"/Dashboard/Additem"}>add new item</Link>
            <p>||</p>
            <button onClick={handlePrint}>
              <PrintIcon />
            </button>
          </div>
          <div ref={componentRef}>
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
        </div>
      ) : (
        <h1 className=" text-center bg-red-800 text-white">hanya admin</h1>
      )}
    </>
  );
}
