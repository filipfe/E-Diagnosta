import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import AboutUs from "./pages/AboutUs"
import Login, { User } from "./pages/Login"
import SignUp from "./pages/SignUp"
import ClientForm from "./pages/signup/ClientForm"
import StationForm from "./pages/signup/StationForm"
import SKP from "./pages/SKP"
import Footer from "./components/Footer"
import PublicRoute from "./utils/PublicRoute"
import PrivateRoute from "./utils/PrivateRoute"
import Profile from "./pages/Profile"
import Verify from "./pages/signup/Verify"
import { useLayoutEffect } from "react"
import { useAppDispatch } from "./main"
import { login, logout } from "./reducers/login"
import jwtDecode from 'jwt-decode'
import AdminRoute from "./utils/AdminRoute"
import AdminPanel from "./pages/AdminPanel"

const loginString: string | null = localStorage.getItem('login')
const loginFromLocalStorage = loginString && JSON.parse(loginString)

export default function App() {
  const dispatch = useAppDispatch()
  
  useLayoutEffect(() => {
    if(loginFromLocalStorage) {
      let user: User = jwtDecode(loginFromLocalStorage.access)
      dispatch(login({
          data: {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              type: user.type
          },
          tokens: { ...loginFromLocalStorage }
      }))
    } else dispatch(logout())
  }, [])
  
  return (
    <>
      <Header />
      <main style={{minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skp/*" element={<SKP />} />
          <Route path="/o-nas" element={<AboutUs />} />
          <Route path="/logowanie" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/rejestracja/*" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/rejestracja/verify/*" element={<PublicRoute><Verify /></PublicRoute>} />
          <Route path="/profil" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/administracja" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}