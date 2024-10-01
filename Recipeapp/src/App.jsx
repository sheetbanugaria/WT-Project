import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from'react-router-dom'

import Registration from './Components/Registration'
import Login from './Components/Login'
import Home from './Components/Home'
import Nav from './Components/Nav'
import CreateRecipe from './Components/CreateRecipe'
import SavedRecipe from './Components/SavedRecipe'
import ReadRecipe from './Components/ReadRecipe'
import EditRecipe from './Components/EditRecipe'


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/auth/register' element={<Registration />}></Route>
        <Route path='/auth/login' element={<Login />}></Route>
        <Route path='/recipe/create-recipe' element={<CreateRecipe />}></Route>
        <Route path='/recipe/saved-recipe' element={<SavedRecipe />}></Route>
        <Route path='/read-recipe/:id' element={<ReadRecipe />}></Route>
        <Route path='/recipe/edit/:id' element={<EditRecipe />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
