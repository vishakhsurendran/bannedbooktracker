import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
