import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import Start from './components/Start'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  const [data, setData]=  useState('');

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Start data={data} setData={setData}/>} />
          <Route exact path={"/chat"} element={<Chat data={data} setData={setData}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
