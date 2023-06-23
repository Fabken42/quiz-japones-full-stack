import './estilos/style.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout.js';
import IndexPage from './pages/IndexPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import NotFoundPage from './pages/NotFoundPage.js'
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
