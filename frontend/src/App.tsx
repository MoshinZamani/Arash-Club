import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./fonts/IranianSans.ttf";
import About from "./components/About";
import Contact from "./components/Contact";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Slideshow from "./components/Slideshow";

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full">
        <Layout />
        <div className="w-full bg-cover bg-no-repeat min-h-screen">
          <main>
            <Routes>
              <Route path="/" element={<Slideshow />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
