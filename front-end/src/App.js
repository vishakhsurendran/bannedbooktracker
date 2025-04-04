import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";

function App() {
  return (
      <BrowserRouter>
          <NavBar>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset" element={<ForgotPassword />} />
            </Routes>
        </NavBar>
      </BrowserRouter>

  );
}

export default App;
