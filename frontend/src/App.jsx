import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import CreateBlog from './pages/CreateBlog'

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/create' element={<CreateBlog />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App