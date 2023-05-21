import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";
import Applogo from "../../images/Applogo.png";


const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="navScreen w-full flex md:justify-center justify-between items-center p-4">

<div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={Applogo} alt="logo" className="w-64 cursor-pointer" />
      </div>

      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="Applogo w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {/* {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))} */}
         <li className="py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#c9cfe4] hover:bg-opacity-20">
         <a  href=" https://cryptoslate.com/ " target={"_blank"}> Market</a>
        </li>
        <li className="py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#bbbfcd] hover:bg-opacity-20 ">
         <a  href="https://coinmarketcap.com/rankings/exchanges/ " target={"_blank"}> Ranking</a>
        </li>
        <li className="py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#bbbfcd] hover:bg-opacity-20 ">
         <a  href="https://www.binance.com/en " target={"_blank"}> Binance</a>
        </li>
 <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] ">
         <a  href=" https://etherscan.io/" target={"_blank"}> EthScan</a>
        </li>
      
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;