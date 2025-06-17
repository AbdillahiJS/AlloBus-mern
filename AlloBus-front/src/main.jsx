import { StrictMode, Suspense,lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Home'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import SplitScreen from './admin/component/splitScreen'
import { PacmanLoader } from "react-spinners";
import { onlineManager } from '@tanstack/react-query';
import NotFound from './NotFound'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});


const AppLayout =lazy(()=>import('./layout/AppLayout'))

const Home =lazy(()=>import('./pages/Home'))
const Voitures =lazy(()=>import('./pages/Voitures'))
const MONRESERVEZ =lazy(()=>import('./pages/monReservez'))
const VoitureLayout =lazy(()=>import('./layout/voitureLayout'))
const VoitureSingle=lazy(()=>import('./pages/voitureSingle'))
const Connecter=lazy(()=>import('./pages/SignIn'))
const Enrigistre=lazy(()=>import('./pages/SignUp'))
const ProtectedRoute =lazy(()=>import('./components/ProtectedRoute'))
const Confirmation =lazy(()=>import('./components/confirmationEmail'))
const Profile =lazy(()=>import('./pages/profile'))
const Logout =lazy(()=>import('./components/Logout'))

//admin 
const Dashboard =lazy(()=>import('./admin/pages/dashboard'))
const Booking =lazy(()=>import('./admin/pages/bookings'))
const UserBooking =lazy(()=>import('./admin/pages/userBooking'))
const Update =lazy(()=>import('./admin/pages/update'))
const Users =lazy(()=>import('./admin/pages/users'))
const SingleUser =lazy(()=>import('./admin/pages/singleUser'))


const ErrorPage =lazy(()=>import('./ErrorPage'))


const router = createBrowserRouter([
  {
      path:'/',
      element:<AppLayout/>,
      errorElement: <ErrorPage />,
      children :  [ 
        {
          index:true,
          element:<Home/>,
     },
           {
            path:'/voitures',
           element:<VoitureLayout/>,
            errorElement: <ErrorPage />,
           children:[
             {
                   index:true,
                   element:<Voitures/>,
                    errorElement: <ErrorPage />
             },
          
           ]
           },
        
         {
               path:'/voitures/:id',
               element:<VoitureSingle/>,
                errorElement: <ErrorPage />
         },
         {
           path:'/reservez',
           element:<ProtectedRoute><MONRESERVEZ/></ProtectedRoute>,
            errorElement: <ErrorPage />
         },
         {
           path:'/connexion',
           element:<Connecter/>,
            errorElement: <ErrorPage />
         },
         {
           path:'/logout',
           element:<Logout/>,
            errorElement: <ErrorPage />
         },
         {
           path:'/enregistre',
           element:<Enrigistre/>,
            errorElement: <ErrorPage />
         },
         {
           path:'/profile',
           element:<ProtectedRoute> <Profile/> </ProtectedRoute>,
            errorElement: <ErrorPage />
         },
         {
           path:'/confirmation/:token/:confirmationId',
           element:<Confirmation/>,
            errorElement: <ErrorPage />
         },
        ],
      },
    {
      path:'/admin',
      element:<SplitScreen/>,
      errorElement: <ErrorPage />,
      children:[
        {
          index:true,
          element:<Dashboard/>,
           errorElement: <ErrorPage />
        },
        {
          path:'users',
          element:<Users/>,
           errorElement: <ErrorPage />
        },
        {
          path:'users/:userId',
          element:<SingleUser/>,
           errorElement: <ErrorPage />
        },
        {
          path:'booking',
          element:<Booking/>,
           errorElement: <ErrorPage />
        },
        {
          path:'booking/:userBookingId',
          element:<UserBooking/>,
           errorElement: <ErrorPage />
        },
        {
          path:'update/:id',
          element:<Update/>,
          errorElement: <ErrorPage />
        },
      ]
    },
    {
      path:'*',
      element:<NotFound/>
    }
]);





// Setup React Query to listen to browser online/offline events
onlineManager.setEventListener((setOnline) => {
  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
});







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
