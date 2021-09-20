import { chars_en } from "../utils/chars-en";
import { chars_fa } from "../utils/chars-fa";

// Home data
import { home_objects_en } from "../translations/Home/Home-en";
import { home_objects_fa } from "../translations/Home/Home-fa";

// GameSetup data
import { game_setup_objects_en } from '../translations/GameSetup/GameSetup-en';
import { game_setup_objects_fa } from '../translations/GameSetup/GameSetup-fa';

// Navbar data
import { navbar_objects_en } from '../translations/Navbar/NavBar-en';
import { navbar_objects_fa } from '../translations/Navbar/NavBar-fa';

const getRoles = (language) => {
  return language === "english" ? chars_en : chars_fa;
};

const getHome = (language) => {
  return language === "english" ? home_objects_en : home_objects_fa;
};

const getGameSetup = (language) => {
  return language === "english" ? game_setup_objects_en : game_setup_objects_fa;
};

const getNavbar = (language) => {
  return language === "english" ? navbar_objects_en : navbar_objects_fa;
}

export { getRoles as default, getHome, getGameSetup, getNavbar };
