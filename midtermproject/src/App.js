
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import MembersPage from './components/MembersPage';

import Navbar2 from './components/Navbar2'; 
import AddProducts from './AddProducts';
import Category from './components/Category';
import ShowProduct from './components/ShowProduct';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowProduct />} /> 
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/members/:userId" element={<MembersPage />} />
        <Route path="/admin" element={<Navbar2 />} /> 
        <Route path="/products" element={<AddProducts/>}/> 
        <Route path="/category" element={<Category />} />
        
          
          
      </Routes>
    </Router>
  );
};

export default App;


