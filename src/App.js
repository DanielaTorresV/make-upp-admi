import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLogin from "./pages/Main_Login";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

ls.config.encrypt = true;
ls.config.secret = "secret-string";

ls.config.encrypter = (data, secret) =>
  AES.encrypt(JSON.stringify(data), secret).toString();

ls.config.decrypter = (data, secret) => {
  try {
    return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
  } catch (e) {
    return data;
  }
};

const PrivateRoute = ({ children }) => {
  const manager = ls.get("isManager");
  return manager ? children : <Navigate to="/" />;
};

const MainRoutes = ({ children }) => {
  const manager = ls.get("isManager");
  return manager ? <Navigate to="/products" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainRoutes children={<MainLogin />}></MainRoutes>}
        />
        <Route
          path="/products"
          element={<PrivateRoute children={<Products />}></PrivateRoute>}
        />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
