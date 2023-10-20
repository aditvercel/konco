"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { redirect } from "next/navigation";
import Link from "next/link";

const data = [
  "Namabarang",
  "Hargabarang",
  "Stockbarang",
  "Deskripsibarang",
  "Status",
  "Gambarbarang",
];
export default function page() {
  const { data: session } = useSession();
  const [typing, setTyping] = useState();
  const [base64String, setBase64String] = useState("");
  console.log("gambarnya", data.Gambarbarang);
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

  console.log(typing);

  const check = (e) => {
    const { name, value } = e.target;
    setTyping((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSave = () => {
    axios.post("/api/Register_barang", {
      ...typing,
      Gambarbarang: base64String,
    });
  };
  return (
    <div className=" p-5">
      <Link className=" flex" href={"/Dashboard"}>
        <ArrowBackIosIcon />
        <h2>Go back to Dashboard</h2>
      </Link>
      <h2 className=" text-center mb-10 text-lg">Add new Item</h2>
      <form className="grid justify-center gap-2" onSubmit={handleSave}>
        {data.map((item) => {
          return (
            <>
              <div
                className=" flex gap-5 justify-between"
                key={crypto.randomUUID}
              >
                <label className=" text-left">{item} : </label>
                <div>
                  {item === "Gambarbarang" ? (
                    <input
                      placeholder={`Input ${item}`}
                      name={item}
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      className=" self-end text-end justify-items-end flex"
                      onChange={handleFileInputChange}
                    ></input>
                  ) : (
                    <input
                      placeholder={`Input ${item}`}
                      name={item}
                      onChange={check}
                      className=" outline-none bg-slate-100 pl-2 "
                    ></input>
                  )}
                </div>
              </div>
            </>
          );
        })}
        <button className=" self-start bg-green-500 pt-2 pb-2 mb-20 mt-10 rounded-md">
          save
        </button>
      </form>
    </div>
  );
}
