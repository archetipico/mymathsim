import { BrowserRouter, Route, Routes } from "react-router";
import { ComplexNumberSolver } from "./pages/complex-numbers";
import { Layout } from "./components/personal/layout";
import "./i18n";
import { COMPLEX_NUMBERS, HOME } from "./paths";
import { Home } from "./pages/home";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      const browserLang = navigator.language || "en-US";
      const lang = browserLang.toLowerCase().startsWith("it") ? "it" : "en";
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  }, [i18n]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={COMPLEX_NUMBERS} element={<ComplexNumberSolver />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
