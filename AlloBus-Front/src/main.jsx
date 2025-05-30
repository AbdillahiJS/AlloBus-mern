import { StrictMode, Suspense,lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Home'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import SplitScreen from './admin/component/splitScreen'
import { PacmanLoader } from "react-spinners";


const queryClient = new QueryClient()


const Home =lazy(()=>import('./pages/Home'))
const Voitures =lazy(()=>import('./pages/Voitures'))
const About =lazy(()=>import('./pages/About'))
const MONRESERVEZ =lazy(()=>import('./pages/monReservez'))
const VoitureLayout =lazy(()=>import('./layout/voitureLayout'))
const Categorie =lazy(()=>import('./pages/Voitures/Categorie'))
const VoitureSingle=lazy(()=>import('./pages/voitureSingle'))
const Connecter=lazy(()=>import('./pages/SignIn'))
const Enrigistre=lazy(()=>import('./pages/SignUp'))
const ProtectedRoute =lazy(()=>import('./components/ProtectedRoute'))
const Confirmation =lazy(()=>import('./components/confirmationEmail'))

//admin 
const Dashboard =lazy(()=>import('./admin/pages/dashboard'))
// const SplitScreen =lazy(()=>import('./admin/component/admin'))
const Booking =lazy(()=>import('./admin/pages/bookings'))
const UserBooking =lazy(()=>import('./admin/pages/userBooking'))
const Setting =lazy(()=>import('./admin/pages/setting'))
const Update =lazy(()=>import('./admin/pages/update'))
const Users =lazy(()=>import('./admin/pages/users'))
const SingleUser =lazy(()=>import('./admin/pages/singleUser'))



const router = createBrowserRouter([
  {
      path:'/',
      element:<Home/>
  },
  {
      path:'/voitures',
      element:<VoitureLayout/>,
      children:[
        {
              index:true,
              element:<Voitures/>,
        },
        {
              path:'categorie',
              element:<Categorie/>,
        },
      ]
      
    },
    {
          path:'/voitures/:id',
          element:<VoitureSingle/>,
    },
    {
      path:'/reservez',
      element:<ProtectedRoute><MONRESERVEZ/></ProtectedRoute>
    },
    {
      path:'/connexion',
      element:<Connecter/>
    },
    {
      path:'/enregistre',
      element:<Enrigistre/>
    },
    {
      path:'/confirmation/:token/:confirmationId',
      element:<Confirmation/>
    },
    {
      path:'/admin',
      element:<SplitScreen/>,
      children:[
        {
          index:true,
          element:<Dashboard/>
        },
        {
          path:'users',
          element:<Users/>
        },
        {
          path:'users/:userId',
          element:<SingleUser/>
        },
        {
          path:'booking',
          element:<Booking/>
        },
        {
          path:'booking/:userBookingId',
          element:<UserBooking/>
        },
        {
          path:'setting',
          element:<Setting/>
        },
        {
          path:'update/:id',
          element:<Update/>
        },
      ]
    }
]);






createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      
        <Suspense fallback={
                          <div className='flex justify-center items-center h-screen ring-1'>
                            <PacmanLoader color='#fea636' size={50}/>
                           </div>
                          }>
           <RouterProvider router={router}/>
        </Suspense>

    </QueryClientProvider>
   
  </StrictMode>,
)
