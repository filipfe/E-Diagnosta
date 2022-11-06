import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ClientForm from "./pages/signup/ClientForm"
import StationForm from "./pages/signup/StationForm"
import SKP from "./pages/SKP"

export default function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skp" element={<SKP />} />
          <Route path="/o-nas" element={<AboutUs />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<SignUp />} />
          <Route path="/rejestracja/klient" element={<ClientForm />} />
          <Route path="/rejestracja/skp" element={<StationForm />} />
        </Routes>
      </main>
    </>
  )
}