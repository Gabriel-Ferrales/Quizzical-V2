import { useState, useEffect } from 'react'
import './App.css'
import Start from "./NewStart"
import Trivia from "./Trivia"


import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<Start />} />
  <Route path="trivia" element={<Trivia />}/>
  </>
))


function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
