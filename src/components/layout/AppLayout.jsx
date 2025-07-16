import { Drawer, Grid, Skeleton } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useErrors, useSocketEvents } from '../../hooks/hook'
import { useMyChatsQuery } from '../../redux/api/api'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducer/chat'
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducer/misc'
import { getSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../constants/event'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'
import { getOrSaveFromStorage } from '../../lib/Features'
import DeleteChatMenu from '../dialog/DeleteChatMenu'
import { useRef } from 'react'


const AppLayout = () => (WrappedComponent) => {
    return (props) => {

        const params = useParams()
        const dispatch = useDispatch()
        const chatId = params.chatId
        const navigate = useNavigate()
        const socket = getSocket()
        const deleteMenuAnchor = useRef(null)

        const [onlineUsers, setOnlineUsers] = useState([])

        const { isMobile } = useSelector((state) => state.misc)
        const { user } = useSelector((state) => state.auth)
        const { newMessageAlert } = useSelector((state) => state.chat)

        const {isLoading, data, isError, error, refetch} = useMyChatsQuery("")

        useEffect(()=> {
            getOrSaveFromStorage({key: NEW_MESSAGE_ALERT, value: newMessageAlert})
        },[newMessageAlert])

        useErrors([{isError, error}])

        const handleMobileClose = () => dispatch(setIsMobile(false))

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({chatId, groupChat}))
            deleteMenuAnchor.current = e.currentTarget
        }

        const newMessageAlertListener = useCallback((data) => {
            if(data.chatId === chatId) return
            dispatch(setNewMessagesAlert(data))
        }, [chatId])

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification())
        },[dispatch])

        const refetchListener = useCallback(()=>{
            refetch()
            navigate('/')
        },[refetch, navigate])

        const onlineUsersListener = useCallback((data)=>{
            setOnlineUsers(data)
        },[])

        const eventHandlers = { 
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        }
    
        useSocketEvents({socket, handlers: eventHandlers})

        return (
            <div>
                <Title />
                <Header/>

                <DeleteChatMenu dispatch={dispatch} deleteOptionAnchor={deleteMenuAnchor.current} />

                {
                    isLoading ? (<Skeleton />) : (
                        <Drawer open={isMobile} onClose={handleMobileClose} >
                            <ChatList w="70vw" chats={data?.message} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessageAlert} onlineUsers={onlineUsers} />
                        </Drawer>
                    )
                }                

                <Grid container height={"calc(100vh - 4rem)"} width={"100vw"}>
                    <Grid item sm={4} md={3} sx={{display: {xs:"none", sm:"block"}}} height={"100%"} >
                        {
                            isLoading ? (<Skeleton />) : (
                                <ChatList chats={data?.message} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessageAlert} onlineUsers={onlineUsers} />
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{display: {xs:"none", md:"block"}}} height={"100%"}>
                        <Profile user={user} />
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default AppLayout
