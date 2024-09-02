import React from 'react';
import Signin from './Signin';
import Header from './Header';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
function App() 
{
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={
          <div className='h-screen flex justify-center items-center'>
            <Signin/>
          </div>}
        />
        <Route path='/signup' element={
          <div className='h-screen flex justify-center items-center'>
            <Signup/>
          </div>}
        />
        <Route path='/signin' element={
          <div className='h-screen flex justify-center items-center'>
            <Signin/>
          </div>}
        />
        <Route path='/profile' element={
          <div className='h-screen flex justify-center items-center'>
            <Dashboard/>
          </div>}
        />
      </Routes>
    </div>
  );
}
export default App;
