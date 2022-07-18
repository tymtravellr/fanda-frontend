import React, { useEffect, useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineInformationCircle,
  HiOutlineShoppingCart
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { handleAddToCart } from "../utilities/db";

const Card = ({ product }) => {
  const [added, setAdded] = useState(false);
  const checkCart = () => {
    const getCart = localStorage.getItem("shopping-cart");

    if (getCart) {
      const storedCart = JSON.parse(getCart);
      const checkProduct = Object.keys(storedCart).find(
        (item) => product._id === item
      );
      console.log(checkProduct);
      if (checkProduct) setAdded(true);
    }
  };
  useEffect(() => {
    checkCart();
  });

  return (
    <div className="h-64 w-64 text-center rounded overflow-hidden group relative">
      <div className="absolute z-10 w-full h-full bg-blue-600 opacity-0 group-hover:opacity-95  duration-200">
        <div className="w-full h-12 p-2">
          <p className=" text-white w-fit text-xs px-2 py-1">
            {product?.category[0]}
          </p>
        </div>
        {added ? (
          <div className="h-32 grid place-content-center">
            <Link to="/cart">
              <button className="btn-custom text-white">Go To Cart</button>
            </Link>
          </div>
        ) : (
          <div className="mt-12 flex items-center justify-center space-x-4">
            <button
              type="button"
              className="text-white text-2xl bg-blue-500 p-3 rounded-full"
              onClick={() => handleAddToCart(product?._id, checkCart)}
            >
              <HiOutlineShoppingCart />
            </button>
            <Link to={`/product/${product?._id}`}>
              <button className="text-white text-2xl bg-blue-500 p-3 rounded-full">
                <HiOutlineInformationCircle />
              </button>
            </Link>
            <Link to="/">
              <button className="text-white text-2xl bg-blue-500 p-3 rounded-full">
                <HiOutlineHeart />
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="h-48 bg-blue-300 relative">
        <img
          className="h-full w-full object-cover"
          src={product?.thumbnail}
          alt=""
        />
      </div>
      <div className="mt-2 h-full px-4 z-10 absolute text-left w-full group-hover:text-white">
        <h4 className="">{product?.title}</h4>
        <p className="font-medium mt-1 text-sm">
          <span className="text-yellow-500 mr-1">$</span>
          {product?.price}
        </p>
      </div>
    </div>
  );
};

export default Card;
