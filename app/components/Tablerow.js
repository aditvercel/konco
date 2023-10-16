"use client";
import React, { useState, useEffect } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";

export default function Tablerow({ data, index }) {
  console.log("datanya", data);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.Namabarang);
  const [price, setPrice] = useState(data.Hargabarang);
  const [stock, setStock] = useState(data.Stockbarang);
  const [description, setDescription] = useState(data.Deskripsibarang);

  const handleSave = async () => {
    let res = await axios.patch("http://localhost:3000/api/Register_barang", {
      id: data._id,
      Namabarang: name,
      Hargabarang: price,
      Stockbarang: stock,
      Deskripsibarang: description,
    });
    window.location.reload();
  };

  const handleClick = () => {
    setEdit(true);
  };
  return (
    <tr>
      {edit ? (
        <>
          <td>{index + 1}</td>
          <td className="w-full text-ellipsis overflow-hidden">
            <input
              placeholder={data.Namabarang}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </td>
          <td>
            <input
              placeholder={data.Hargabarang}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
          </td>
          <td>
            <input
              placeholder={data.Stockbarang}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full"
            />
          </td>
          <td className="w-full text-ellipsis overflow-hidden">
            <input
              placeholder={data.Deskripsibarang}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </td>
          <td>
            <div className="w-20 h-20 bg-red-500"></div>
          </td>
          <td>
            <div>
              <Select variant="soft" placeholder="status" className="w-3/4">
                <Option>Active</Option>
                <Option>Null</Option>
              </Select>
            </div>
          </td>
          <td>
            <div className="flex gap-5">
              <button onClick={handleSave}>save</button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td>{index + 1}</td>
          <td className="w-full text-ellipsis overflow-hidden">
            {data.Namabarang}
          </td>
          <td>{data.Hargabarang}</td>
          <td>{data.Stockbarang}</td>
          <td className="w-full text-ellipsis overflow-hidden">
            {data.Deskripsibarang}
          </td>
          <td>
            <div className="w-20 h-20 bg-red-500"></div>
          </td>
          <td>
            <div>
              <p>Active</p>
            </div>
          </td>
          <td>
            <div className="flex gap-5">
              <button onClick={handleClick}>edit</button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
