import { useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Home } from './pages/Home'
import Market from './pages/Market'
import { Events } from './pages/Events'
import Trade from './pages/Trade'
import Navbar from './components/Navbar'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <Outlet />
      </main>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/market',
        element: <Market />
      },
      {
        path: '/events',
        element: <Events />
      },
      {
        path: '/trade/:eventId',
        element: <Trade />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
