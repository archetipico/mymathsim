import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/personal/layout";
import "./i18n";
import { Fourier } from "./pages/complex-numbers/fourier";
import { ComplexNumberSolver } from "./pages/complex-numbers/introduction";
import { Home } from "./pages/home";
import { COMPLEX_NUMBERS, COMPLEX_NUMBERS_FOURIER, HOME } from "./paths";

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
          <Route path={COMPLEX_NUMBERS_FOURIER} element={<Fourier />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
