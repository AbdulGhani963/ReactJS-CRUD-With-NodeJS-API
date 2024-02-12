import React, { useState } from "react";
import {
  GlobeAltIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const Links = [
    { name: "Home", link: "/", id: 1 },
    { name: "About", link: "/about", id: 2 },
    { name: "SignIn", link: "/signin", id: 3 },
    { name: "LogIn", link: "/login", id: 4 },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-md w-full top-0 left-0">
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center bg-gray-800">
        <div className="flex text-2xl cursor-pointer items-center gap-2">
          <GlobeAltIcon className="w-7 h-7 text-blue-600" />
          <span className="font-bold">Auth</span>
        </div>

        <div
          onClick={openHandler}
          className="w-7 h-7 absolute right-8 top-4 cursor-pointer md:hidden"
        >
          {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Links */}
        <ul
          className={`md:flex text-center md:items-center md:pb-0 pb-12 absolute md:static 
           text-blue-600 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 
          transition-all duration-[455ms] ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}
        >
          {Links.map((link) => {
            return (
              <li key={link.id} className="font-semibold my-7 md:my-0 md:ml-8">
                <a href={link.link}>{link.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
