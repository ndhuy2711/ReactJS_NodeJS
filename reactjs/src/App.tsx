import React from 'react';
import HomePage from './Pages/HomePage';
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Introduce from './Pages/Introduce';
import User from './Pages/User';
import { Router } from './Router'
import PageNotFound from './PageNotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={Router.Home} element={<HomePage active='home' />} />
      <Route path={Router.Introduce} element={<Introduce active='introduce' />} />
      <Route path={Router.Login} element={<Login active='login' />} />
      <Route path={Router.Register} element={<Register active='register' />} />
      <Route path={Router.User} element={<User active='user' />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes >
  );
}

export default App;
