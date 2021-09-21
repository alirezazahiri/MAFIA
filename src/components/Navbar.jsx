import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { getNavbar } from "../services/getData";

// Styles
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { language } = useContext(LanguageContext);
  const { title, senarios, players, gods_room, game_setup } =
    getNavbar(language);

  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav
        className={
          styles.container +
          " flex flex-wrap items-center justify-between px-2 py-3 bg-black mb-3"
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
            >
              {title}
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/game-setup"
                >
                  {game_setup}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/players-roles"
                >
                  {players}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/god-vision"
                >
                  {gods_room}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/scenarios"
                >
                  {senarios}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
