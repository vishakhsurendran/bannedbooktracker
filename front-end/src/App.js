import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import SearchPage from "./pages/SearchPage";
import BookDetails from "./pages/BookDetails";
import Accounts from "./pages/Accounts";
import Map from "./pages/Map";
import LocationResult from "./pages/LocationResult";
import { Link } from 'react-router-dom';
import NavBar from "./components/NavBar";


/*function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Login</Link> |
          <Link to="/signup">Sign Up</Link> |
          <Link to="/reset">Forgot Password</Link> |
          <Link to="/search">Search Page</Link> |
          <Link to="/book-details">Book Details</Link> |
          <Link to="/accounts">Accounts</Link> |
          <Link to="/map">Map</Link> |
          <Link to="/location-result">Location Result</Link>

        </nav>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/map" element={<Map />} />
          <Route path="/location-result" element={<LocationResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;*/


function App() {
  return (
      <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset" element={<ForgotPassword />} />
            </Routes>
      </BrowserRouter>

  );
}

export default App;
