import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'
import { TransTeal } from '../constants/Color'

const ChatList = ({w= "100%", chats=[], chatId, onlineUsers=[], newMessagesAlert, handleDeleteChat}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"} bgcolor={TransTeal} >
        {
            chats?.map((data, index) => {
                const {avatar, members, _id, name, groupChat} = data
                const newMessageAlert = newMessagesAlert.find(
                    ({chatId}) => chatId === _id
                )
                const isOnline = members?.some(member => onlineUsers.includes(member))
                return <ChatItem index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} key={_id} groupChat={groupChat} sameSender={chatId === _id} handleDeleteChat={handleDeleteChat } />
            })
        }
    </Stack>
  )
}

export default ChatList








