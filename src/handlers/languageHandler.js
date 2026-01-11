import i18n from "../i18n";

const languageHandler = () => {
  const newLanguage = i18n.language === "en" ? "fr" : "en";
  localStorage.setItem("language", newLanguage);
  i18n.changeLanguage(newLanguage);
  return newLanguage;
};

export default languageHandler;
