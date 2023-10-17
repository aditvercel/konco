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

  const handleSave = async () => {
    let res = await axios.patch("http://localhost:3000/api/Register_barang", {
      id: data._id,
      Namabarang: name,
      Hargabarang: price,
      Stockbarang: stock,
      Gambarbarang: base64String,
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
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              className="w-full"
              onChange={handleFileInputChange}
            />
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
            <img
              className="w-20 h-20"
              src={
                data.Gambarbarang ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpLA0jC7YBQqrWoXPU6juFeubvTYAOSJ6zZ3YGC2vh&s"
              }
            ></img>
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
