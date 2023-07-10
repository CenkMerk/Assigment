import "./App.css";
import { Routes, Route } from "react-router-dom";
import AccountBox from "./pages/AccountBox/AccountBox.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Company from "./pages/Company/Company.jsx";
import Products from "./pages/Products/Products.jsx";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Routes>
        <Route path="/" element={<AccountBox />} />
        <Route path="/Anasayfa" element={<Homepage />} />
        <Route path="/Şirketler" element={<Company />} />
        <Route path="/Ürünler" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
