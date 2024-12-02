import { useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import Market from './pages/Market'
import { Events } from './pages/Events'

const router = createBrowserRouter([{
  path: '/',
  element: <Home/>
},{
  path: '/market',
  element: <Market/>
},{
  path: '/events',
  element: <Events/>
}])

function App() {

  useEffect(() => {
  }, [])
  return <RouterProvider router={router}/>
}

export default App
