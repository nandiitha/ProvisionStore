import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Product';
import About from './pages/About';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/products" element={<Product />} />
       <Route path="/about" element={<About />} />

    </Routes>
  </Router>
  );
  
}

export default App;





