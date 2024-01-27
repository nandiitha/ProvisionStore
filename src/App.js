import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Product';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/products" element={<Product />} />
    </Routes>
  </Router>
  );
  
}

export default App;





