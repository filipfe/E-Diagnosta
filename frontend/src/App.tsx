import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ClientForm from "./pages/signup/ClientForm"
import StationForm from "./pages/signup/StationForm"
import SKP from "./pages/SKP"
import Footer from "./components/Footer"
import PublicRoute from "./utils/PublicRoute"
import PrivateRoute from "./utils/PrivateRoute"
import Profile from "./pages/Profile"

export default function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skp" element={<SKP />} />
          <Route path="/o-nas" element={<AboutUs />} />
          <Route path="/logowanie" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/rejestracja" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/rejestracja/klient" element={<PublicRoute><ClientForm /></PublicRoute>} />
          <Route path="/rejestracja/skp" element={<PublicRoute><StationForm /></PublicRoute>} />
          <Route path="/profil" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}