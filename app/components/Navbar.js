"use client";
import Link from "next/link";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/joy/Drawer";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { cartcontext } from "../components/Cartcontext";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart, addItemToCart, removeItemFromCart, handleQuantityChange } =
    useContext(cartcontext);
  return (
    <div className=" bg-slate-800 pl-5 flex justify-between pr-5 pt-5 pb-5">
      <Link
        href={"/"}
        className="  text-white h-20 text-3xl self-center flex align-middle text-center items-center"
      >
        KONNCO
      </Link>
      <ul className=" flex item-center self-center gap-10 text-white">
        <Link href={"/"} className=" flex self-center active:text-black">
          Home
        </Link>
        <Link href={"/Product"} className=" flex self-center gap-2">
          Our Product
        </Link>
        <Link href={"/Cart"} className=" flex self-center gap-2">
          Cart
          <ShoppingCartIcon />
          <p className=" text-red-500">{cart.length}</p>
        </Link>
        <Link
          href={"/Dashboard"}
          className=" flex self-center active:text-black"
        >
          Dashboard
        </Link>
        {session ? (
          <button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        ) : (
          <Link href={"/Login"} className=" flex self-center">
            Login
          </Link>
        )}
      </ul>
    </div>
  );
}
