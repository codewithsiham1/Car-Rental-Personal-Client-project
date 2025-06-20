import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router, RouterProvider } from 'react-router-dom'
import router from './Router/Router'
import { HelmetProvider } from 'react-helmet-async'
import Authprovider from './Providers/Authprovider/Authprovider'
import { ToastContainer } from 'react-toastify'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
<Authprovider>
      <QueryClientProvider client={queryClient}>
       <HelmetProvider>
      <ToastContainer  position="top-center"autoClose={2500} hideProgressBar={false}newestOnTop={false}closeOnClickrtl={false}pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    <RouterProvider router={router}></RouterProvider>
   </HelmetProvider>
    </QueryClientProvider>
</Authprovider>
  </StrictMode>,
)
