import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLogin from "./pages/Main_Login";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
