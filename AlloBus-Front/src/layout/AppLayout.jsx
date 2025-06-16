import React from 'react'
import { Outlet } from 'react-router-dom'
import OfflinePage from '../components/Offline'
import { useOnlineStatus } from '../hooks/useOnlineStatus'


const AppLayout = () => {

    const isOnline = useOnlineStatus() 
    console.log('isOnline > ',isOnline)

    if (!isOnline) return <OfflinePage/>

    return <Outlet/>
            
}

export default AppLayout