import { Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import NotificationPage from './pages/notificaiton/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'

import LoginPage from './pages/auth/login/LoginPage'
import SignUpPage from './pages/auth/signup/SignUpPage'

import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import LoadingSpinner from './components/common/LoadingSpinner'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

function App() {
  const { data: authUser, isLoading } = useQuery({
    // queryKey allows us to use authUser to refer to the logged in user throught app
    queryKey: ["authUser"],
    queryFn: async () => {
      try{
        const res = await fetch("/api/auth/authCheck");
        const data = await res.json();
        // This ensures that a truthy value is not returned because it can return {} but we need null to indicate false value.
        if(data.error) return null;
        if(!res.ok) throw new Error(data.error);
        console.log("User authenticated: ", data)
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    // useQuery will auto retry 3x if it fails, we don't want 3x, just once.
    retry: false,
  });

  if(isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
      <Routes>

        <Route path='/login' element={!authUser ?<LoginPage /> : <Navigate to='/'/>}/>
        <Route path='/signup' element={!authUser ?<SignUpPage /> : <Navigate to='/'/>}/>

        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login'></Navigate>}/>
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login'></Navigate>}/>
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login'></Navigate>}/>

      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
