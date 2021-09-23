import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { getNavbar } from "../services/getData";

// Styles
import styles from "../styles/Navbar.module.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

// Images
import iran_flag from "../styles/img/iran-flag-round-icon-64.png";
import uk_flag from "../styles/img/uk-flag-round-icon-64.png";

const NavBar = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { title, senarios, players, gods_room, game_setup } =
    getNavbar(language);
  const toggleLangHandler = () => {
    setLanguage((prevLang) => {
      const currentLang = prevLang === "english" ? "persian" : "english";
      return currentLang;
    });
  };

  return (
    <Navbar
      className={styles.container}
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container className={styles.content}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <img
          onClick={toggleLangHandler}
          src={language === "persian" ? iran_flag : uk_flag}
          style={{ width: "45px" }}
          alt="IR"
        />
        <div>
          <Link className={styles.title} to="/">
            {title}
          </Link>
        </div>
        {/* LanguageChange.jsx */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.linksContainer + " me-auto"}>
            <NavLink to="/game-setup">{game_setup}</NavLink>
            <NavLink to="/players-roles">{players}</NavLink>
            <NavLink to="/god-vision">{gods_room}</NavLink>
            <NavLink to="/scenarios">{senarios}</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
