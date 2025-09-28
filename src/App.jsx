import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { About } from "./components/About/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Documents } from "./components/Documents/Documents";
import { Contacts } from "./components/Contacts/Contacts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app no-scrollbar">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
