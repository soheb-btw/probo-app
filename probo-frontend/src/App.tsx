import { useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import Market from './pages/Market'
import { Events } from './pages/Events'
import Trade from './pages/Trade'

const router = createBrowserRouter([{
  path: '/',
  element: <Home/>
},{
  path: '/market',
  element: <Market/>
},{
  path: '/events',
  element: <Events/>
},{
  path: '/trade/:eventId',
  element: <Trade/>
}])

function App() {

  useEffect(() => {
  }, [])
  return <RouterProvider router={router}/>
}

export default App
