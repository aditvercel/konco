"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { cartcontext } from "../components/Cartcontext";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [quantity, setQuantity] = useState();
  const { cart, addItemToCart, removeItemFromCart, handleQuantityChange } =
    useContext(cartcontext);
  console.log(cart);
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <div className="p-5">
        <Link href={"/Product"} className="flex mb-20">
          <ArrowBackIosIcon />

          <h1>continue shoping</h1>
        </Link>
        <h1 className="text-center ">Shopping cart </h1>
        <h1 className="text-center ">
          You have {cart.length} item in your cart{" "}
        </h1>
        <div className=" grid mt-20 gap-5">
          {cart &&
            cart.map((item) => {
              return (
                <>
                  <div className="rounded-lg md:w-1/2 shadow shadow-black p-2">
                    <div className=" w-full bg-slate-50 border flex gap-5 justify-evenly items-center p-2">
                      <img
                        src={item.thumbnail}
                        className="w-20 h-20 rounded-lg shadow-md shadow-black"
                      ></img>
                      <div>
                        <h1 className=" text-xl font-light">{item.brand}</h1>
                        <p>size</p>
                      </div>
                      <div className=" flex">
                        <input
                          type="number"
                          placeholder={item.quantity}
                          min={1}
                          className=" placeholder:text-black outline-none text-center w-20"
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        ></input>
                        <p>pcs</p>
                      </div>
                      <div>${item.price * item.quantity}</div>
                      <button onClick={() => removeItemFromCart(item.id)}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <h2 className=" text-center mb-20 mt-20">
        TOTAL Harga : ${calculateTotalPrice()}
      </h2>
      <div className=" flex justify-center mb-20">
        <button
          className="border w-40 h-20 self-center shadow shadow-black text-center rounded-lg"
          onClick={() => {
            axios
              .post("/api/Checkout", {
                total: calculateTotalPrice(),
              })
              .then((item) => {
                console.log(item.data.coba);
                router.push(item.data.coba);
              });
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
