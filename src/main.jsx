import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router, RouterProvider } from 'react-router-dom'
import router from './Router/Router'
import { HelmetProvider } from 'react-helmet-async'
import Authprovider from './Providers/Authprovider/Authprovider'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
<Authprovider>
     <HelmetProvider>
      <ToastContainer  position="top-center"autoClose={2500} hideProgressBar={false}newestOnTop={false}closeOnClickrtl={false}pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    <RouterProvider router={router}></RouterProvider>
   </HelmetProvider>
</Authprovider>
  </StrictMode>,
)
