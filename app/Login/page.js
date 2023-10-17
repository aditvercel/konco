"use client";
import React, { useState } from "react";
import Image from "next/image";

import axios from "axios";

import { useSession, signIn, signOut } from "next-auth/react";

export default function page() {
  const [typing, setTyping] = useState();
  const { data: session } = useSession();

  console.log(session);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTyping((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-5 bg-black">
      <div className=" h-screen w-full border border-black flex justify-center align-middle items-center bg-white">
        <div className=" grid gap-5">
          <div className=" flex justify-center">
            <img
              src={
                "https://play-lh.googleusercontent.com/6W8uEbKY_xkCy0bA2MzMgCNLyXIQ4hgjz0lv7OCS6iF5FYcq5LU0TDNW8PPjcNuoC-k"
              }
              className=" w-56 h-32 rounded-md"
            />
          </div>
          <div className=" flex gap-5 justify-center align-middle">
            <label>Username : </label>
            <input
              placeholder="input username"
              className=" outline-none border pl-2"
              name="UserName"
              onChange={handleChange}
            ></input>
          </div>
          <div className=" flex gap-5 justify-center align-middle">
            <label>Password : </label>
            <input
              placeholder="input password"
              className=" outline-none border pl-2"
              type="password"
              name="Password"
              onChange={handleChange}
            ></input>
          </div>
          <div className=" text-xs">
            <p className="mb-2">demo account : </p>
            <div className="flex gap-10">
              <div className="grid">
                <p>ADMIN</p>
                <p>username : aditya</p>
                <p>Password : aditya</p>
              </div>
              <div className="grid">
                <p>PUBLIC</p>
                <p>username : joni</p>
                <p>Password : joni</p>
              </div>
            </div>
          </div>
          <p className=" text-end">regiter</p>
          {session ? (
            <button
              className=" border hover:bg-slate-800 hover:text-white"
              onClick={() => {
                signOut();
              }}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className=" border hover:bg-slate-800 hover:text-white"
              onClick={() => {
                signIn("credentials", typing);
              }}
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
