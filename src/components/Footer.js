import React from "react";
import { BsFacebook, BsInstagram, BsMedium, BsTwitter } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation()
  if((location.pathname === "/login") || (location.pathname === '/register')){
    return null
  }
  return (
    <footer className="border px-4 py-10 text-black">
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full">
          <h1 className="text-2xl">Fanda Commerce Co.</h1>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <BsFacebook className="text-xl md:text-2xl" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <BsInstagram className="text-xl md:text-2xl" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <BsTwitter className="text-xl md:text-2xl" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <BsMedium className="text-xl md:text-2xl" />
              </a>
            </li>
          </ul>
          <div>
            <button className="btn-custom bg-transparent border-black text-black">Join Our Newsletter</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  justify-between items-center md:items-start max-w-2xl space-y-4 md:space-y-0">
          <div>
            <address>Dhaka Bangladesh</address>
          </div>
          <ul>
            <li>Help</li>
            <li>Gift Cards</li>
            <li>Order Status</li>
            <li>Free Shipping</li>
            <li>Return & Exchanges</li>
            <li>International</li>
          </ul>
          <ul>
            <li>About Us</li>
            <li>Jobs</li>
            <li>Affiliates</li>
            <li>Meet The Maker</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex justify-center md:justify-between">
            <p className="">&copy; 2022 Need Supply Company-All Rights Reserved</p>
            <div className="space-x-6 hidden md:flex">
                <Link to='/'>
                    Privacy Policy
                </Link>
                <Link to='/'>
                    Terms & Conditions
                </Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
