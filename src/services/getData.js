import { chars_en } from "../utils/chars-en";
import { chars_fa } from "../utils/chars-fa";

// Home data
import { home_objects_en } from "../translations/Home/Home-en";
import { home_objects_fa } from "../translations/Home/Home-fa";

const getRoles = (language) => {
  return language === "english" ? chars_en : chars_fa;
};

const getHome = (language) => {
  return language === "english" ? home_objects_en : home_objects_fa;
};

export { getRoles as default, getHome };
