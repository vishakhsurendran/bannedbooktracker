import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route} from "react-router";
import Container from "react-bootstrap/Container";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import SearchPage from "./pages/SearchPage";
import BookDetails from "./pages/BookDetails";
import Accounts from "./pages/Accounts";
import Map from "./pages/Map";
import LocationResult from "./pages/LocationResult";
import Home from "./pages/Home"
import NavBar from "./components/NavBar";
import ReadingList from "./pages/ReadingList";
import ReadingListDetails from "./pages/ReadingListDetails";

function App() {

  return (
      <div>
          <NavBar />
              <Container>
              <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/reset" element={<ForgotPassword />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/book-details" element={<BookDetails />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/location-result" element={<LocationResult />} />
                  <Route path="/lists" element={<ReadingList />} />
                  <Route path="/list-details" element={<ReadingListDetails />} />
              </Routes>
              </Container>
      </div>
  );
}

export default App;
