"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { useContext } from "react";
import { cartcontext } from "../components/Cartcontext";

export default function page() {
  const [data, setData] = useState();
  const { cart, addItemToCart } = useContext(cartcontext);
  const [pag, setPag] = useState();
  console.log(pag);
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(async (item) => {
      let res = await item.data;
      setData(res);
    });
  }, []);

  return (
    <>
      <div className=" flex">
        <div className=" w-72 bg-neutral-800 relative">
          <div className="relative h-3/4">
            <div className=" sticky top-40 grid gap-5">
              <div className=" flex justify-center">
                <div className=" w-3/4 bg-white p-2 flex rounded-full justify-evenly">
                  <SearchIcon />
                  <input
                    placeholder=" Search items"
                    className=" outline-none  w-full "
                  />
                </div>
              </div>

              <ul className=" grid gap-10 mt-10 text-lg font-serif text-white ">
                <li className=" hover:bg-slate-800 text-center">
                  <p>Meja</p>
                </li>
                <li className=" hover:bg-slate-800 text-center">
                  <p>Kursi</p>
                </li>
                <li className=" hover:bg-slate-800 text-center">
                  <p>Lemari</p>
                </li>
                <li className=" hover:bg-slate-800 text-center">
                  <p>Checkout</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" grid">
          <div className=" p-5">
            <Carousel
              swipeable={true}
              showThumbs={false}
              showIndicators={false}
              showArrows={false}
              autoPlay={true}
              infiniteLoop={true}
              emulateTouch={true}
              showStatus={false}
              transitionTime={1000}
              interval={3000}
              className="w-full h-56 mb-20 border border-black shadow-md shadow-black "
            >
              <div className=" flex ">
                <img
                  src="https://images.pexels.com/photos/7534561/pexels-photo-7534561.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  className="w-full h-56 object-fit"
                />
              </div>
              <div className=" flex ">
                <img
                  src="https://images.pexels.com/photos/7534555/pexels-photo-7534555.jpeg?auto=compress&cs=tinysrgb&w=1400&h=750&dpr=2"
                  className="w-full h-56 object-fit"
                />
              </div>
              <div className=" flex ">
                <img
                  src="https://images.pexels.com/photos/7005297/pexels-photo-7005297.jpeg?auto=compress&cs=tinysrgb&w=1400&h=750&dpr=2"
                  className="w-full h-56 object-fit"
                />
              </div>
            </Carousel>
          </div>

          <div className=" grid grid-cols-2 md:grid-cols-4 gap-5 p-5 justify-items-center ">
            {data &&
              data.products.map((item, index) => {
                return (
                  <Card
                    sx={{ maxWidth: 250 }}
                    className=" shadow-md shadow-black rounded-lg mb-20"
                    key={index}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={data && item.thumbnail}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className=" line-clamp-1"
                      >
                        {item.brand}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="line-clamp-3 h-16"
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                    <h1 className="pl-5 text-red-500">${item.price}</h1>
                    <CardActions>
                      <Button size="small" onClick={() => addItemToCart(item)}>
                        BUY
                      </Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                );
              })}
          </div>
          <div className=" flex justify-center align-middle justify-items-center mb-20">
            <Pagination
              count={10}
              size="large"
              color="primary"
              onChange={(e, value) => {
                setPag(value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
