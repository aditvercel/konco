"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const data = [
  "Namabarang",
  "Hargabarang",
  "Stockbarang",
  "Deskripsibarang",
  "Gambarbarang",
  "Status",
];
export default function page() {
  const { data: session } = useSession();
  const [typing, setTyping] = useState();
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
    axios.post("http://localhost:3000/api/Register_barang", typing);
  };
  return (
    <div>
      <h2>Add new Item</h2>
      <form className="grid justify-center" onSubmit={handleSave}>
        {data.map((item) => {
          return (
            <>
              <div
                className=" flex gap-5 justify-evenly"
                key={crypto.randomUUID}
              >
                <label className=" text-left">{item} : </label>
                <input
                  placeholder={`Input ${item}`}
                  name={item}
                  onChange={check}
                ></input>
              </div>
            </>
          );
        })}
        <button>save</button>
      </form>
    </div>
  );
}
