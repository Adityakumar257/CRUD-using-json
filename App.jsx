/* eslint-disable no-unused-vars */
import React from 'react'
import  {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Read from './Read'
import Update from './Update'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Create' element={<Create/>}/>
    <Route path='/Read/:id' element={<Read/>}/>
    <Route path='/Update/:id' element={<Update/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
