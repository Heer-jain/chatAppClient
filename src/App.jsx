import React, {lazy, Suspense, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ProtectRoutes from './components/auth/ProtectRoutes.jsx'
import LayoutLoaders from './components/layout/Loaders.jsx'
import axios from 'axios'
import { server } from './components/constants/config.js'
import { useDispatch, useSelector } from 'react-redux'
import { userExits, userNotExits } from './redux/reducer/auth.js'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './socket.jsx'

const Home = lazy(()=> import("./pages/Home.jsx"))
const Login = lazy(()=> import("./pages/Login.jsx"))
const Chat = lazy(()=> import("./pages/Chat.jsx"))
const Groups = lazy(()=> import("./pages/Groups.jsx"))
const NotFound = lazy(()=> import("./pages/NotFound.jsx"))
const AdminLogin = lazy(()=>import('./pages/admin/AdminLogin.jsx'))
const Dashboard = lazy(()=>import('./pages/admin/Dashboard.jsx'))
const ChatManagment = lazy(() => import('./pages/admin/ChatManagment.jsx'))
const UserManagment = lazy(() => import('./pages/admin/UserManagment.jsx'))
const MessageManagment = lazy(() => import('./pages/admin/MessageManagment.jsx'))

const App = () => {

  const { user, loader } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    axios
    .get(`${server}/user/me`, {withCredentials: true})    
    .then(({data}) => dispatch(userExits(data.message)))
    .catch((err) => dispatch(userNotExits()))
  }, [dispatch])
  

  return loader ? (<LayoutLoaders />) : (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<SocketProvider><ProtectRoutes user={user}/></SocketProvider>}>
            <Route path='/' element={<Home/>} />
            <Route path='/chat/:chatId' element={<Chat/>} />
            <Route path='/groups' element={<Groups/>} />
          </Route>

          <Route path='/login' element={<ProtectRoutes user={!user} redirect='/'><Login/></ProtectRoutes>} />

          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/user-managment' element={<UserManagment />} />
          <Route path='/admin/chat-managment' element={<ChatManagment />} />
          <Route path='/admin/message-managment' element={<MessageManagment />} />

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Suspense>
      <Toaster position='bottom-center' />
    </BrowserRouter>
  )
}

export default App
