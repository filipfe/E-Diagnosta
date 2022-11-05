import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </>
  )
}

export default App
