import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NewNav = ({ chosenCard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isCardChosen = chosenCard && chosenCard.image;

  return (
    <nav
      className={`border-solid flex items-center justify-between p-1 bg-slate-500 rounded text-slate-100 relative`}
    >
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold hover:underline">
        DDEUX
      </h1>

      <div className="flex items-center">
        <div className="w-14 h-14 relative">
          <Image
            src={isCardChosen ? chosenCard.image : "/images/dadeuce.png"}
            alt="Game logo"
            layout="fill"
            objectFit="cover"
            className="rounded-full items-center p-1"
          />
        </div>
      </div>

      <div className={`block lg:hidden ml-auto ${isMenuOpen ? "hidden" : ""}`}>
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isMenuOpen ? "" : "hidden"
        } lg:block`}
      >
        <div className="text-sm lg:flex-grow lg:text-right mr-6">
          <Link href="/lorepaper" passHref>
            <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 cursor-pointer">
              Lorepaper
            </div>
          </Link>
          <a
            href="https://github.com/DDEUX-game"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 cursor-pointer"
          >
            Github Repo
          </a>
          <a
            href="https://devpost.com/software/ddeux-the-game"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white cursor-pointer"
          >
            Hackathon Page
          </a>
        </div>
        {isMenuOpen && (
          <button
            className="absolute top-3 right-3 text-xl text-white"
            onClick={toggleMenu}
          >
            &times;
          </button>
        )}
      </div>
    </nav>
  );
};

export default NewNav;
