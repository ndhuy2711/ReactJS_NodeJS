import React from 'react';
import HomePage from './Pages/HomePage';
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Introduce from './Pages/Introduce';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage active='home' />} />
      <Route path='/introduce' element={<Introduce active='introduce' />} />
      <Route path='/login' element={<Login active='login' />} />
      <Route path='/register' element={<Register active='register' />} />
    </Routes>
  );
}

export default App;
