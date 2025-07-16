import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { grayColor, lightTeal, teal } from '../components/constants/Color'
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../components/constants/event'
import FileMenu from '../components/dialog/FileMenu'
import AppLayout from '../components/layout/AppLayout'
import MessageComponent from '../components/shared/MessageComponent'
import { InputBox } from '../components/styles/StyledComponent'
import { useErrors, useSocketEvents } from '../hooks/hook'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'
import { getSocket } from '../socket'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux'
import { setIsFileMenu } from '../redux/reducer/misc'
import { removeNewMessageAlert } from '../redux/reducer/chat'
import { TypingLoader } from '../components/layout/Loaders'
import { useNavigate } from 'react-router-dom'


const Chat = ({chatId, user}) => {

  const socket = getSocket()
  const containerRef = useRef(null)
  const bottomRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [IamTyping, setIamTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)

  const typingTimeout = useRef(null)
  
  const chatDetails = useChatDetailsQuery({chatId}, {skip: !chatId})
  const oldMessagesChunk = useGetMessagesQuery({chatId, page:page})

  const {data: oldMessages, setData: setOldMessages} = useInfiniteScrollTop(
    containerRef, 
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.message
  )

  const errors = [
    {isError: chatDetails.isError, error: chatDetails.error},
    {isError: oldMessagesChunk.isError, error: oldMessagesChunk.error},
  ]

  const members = chatDetails?.data?.chat?.members

  const messageOnChange = (e) => {
    setMessage(e.target.value)
    if(!IamTyping) {
      socket.emit(START_TYPING, {members, chatId})
      setIamTyping(true)
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current)

    typingTimeout.current =  setTimeout(()=>{
      socket.emit(STOP_TYPING, {members, chatId})
      setIamTyping(false)
    }, 2000)
  }

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if(!message.trim()) return
    socket.emit(NEW_MESSAGE, {chatId, members, message})
    setMessage("")
  }

  useEffect(() => {
    socket.emit(CHAT_JOINED, {userId: user._id, members})
    dispatch(removeNewMessageAlert(chatId))
    return () => {
      setMessage("")
      setMessages([])
      setOldMessages([])
      setPage(1)
      socket.emit(CHAT_LEAVED, {userId: user._id, members})
    }
  }, [chatId])

  useEffect(()=>{
    if(bottomRef.current) bottomRef.current.scrollIntoView({behavior: "smooth"})
  },[messages])

  useEffect(() => {
    if(chatDetails.isError) return navigate('/')
  },[chatDetails.isError])

  const newMessagesListener = useCallback((data) => {
    if(data.chatId !== chatId) return
    setMessages(prev=>[...prev, data.message])
  }, [chatId])

  const startTypingListener = useCallback((data)=>{
    if(data.chatId !== chatId) return
    setUserTyping(true)
  },[chatId])  

  const stopTypingListener = useCallback((data)=>{
    if(data.chatId !== chatId) return
    setUserTyping(false)
  },[chatId])  

  const alertListener = useCallback((data)=>{
    if(data.chatId !== chatId) return
    const messageForAlert = {
        content: data.message,
        sender:{
            _id: "ajdsjdladlkajdajfldskjldsf",
            name: "Admin"
        },
        chat: chatId,
        createdAt: new Date().toISOString()
    }

    setMessages((prev) => [...prev, messageForAlert])
  },[chatId])

  const eventHandler = {
   [ALERT]: alertListener,
   [NEW_MESSAGE]: newMessagesListener,
   [START_TYPING]: startTypingListener,
   [STOP_TYPING]: stopTypingListener,
  }
    
  useErrors(errors)
  useSocketEvents({socket, handlers: eventHandler})

  const allMessages = [...oldMessages, ...messages]

  return chatDetails.isLoading ? (<Skeleton />) : (
    <Fragment>
    <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"} bgcolor={grayColor} height={"90%"} sx={{overflowX: "hidden", overflowY: "auto"}} >
      {allMessages.map((i) => (
        <MessageComponent message={i} user={user} key={i._id} />
      ))}
      {userTyping && <TypingLoader />}
      <div ref={bottomRef} />
    </Stack>
    <form style={{height: "10%"}} onSubmit={sendMessage} >
      <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
        <IconButton onClick={handleFileOpen} sx={{position:"absolute", left:"1.5rem",  }}>
          <AttachFileIcon />
        </IconButton>
        <InputBox placeholder='Type Message Here...' value={message} onChange={messageOnChange} />
        <IconButton type='submit' sx={{rotate:"-50deg", bgcolor: lightTeal, color:"white", marginLeft:"1rem", padding:"0.5rem", "&:hover":{bgcolor: teal}}} >
          <SendIcon />
        </IconButton>
      </Stack>
    </form>

    <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />

  </Fragment>
  )
}

export default AppLayout()(Chat)