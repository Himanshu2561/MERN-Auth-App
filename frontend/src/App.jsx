import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./screens/PageNotFound";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/*" element={<PageNotFound />} />
        // ---------Private Routes---------
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
