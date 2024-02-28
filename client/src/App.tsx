import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Compiler from "./pages/Compiler";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
