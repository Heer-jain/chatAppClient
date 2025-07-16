import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { setIsDeleteMenu } from '../../redux/reducer/misc'
import { useSelector } from 'react-redux'
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'

const DeleteChatMenu = ({dispatch, deleteOptionAnchor}) => {

    const {isDeleteMenu, selectedDeleteChat} = useSelector(state=>state.misc)

    const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation)
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)

    const navigate = useNavigate()
    const isGroup = selectedDeleteChat.groupChat

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false))
        deleteOptionAnchor = null
    }

    const LeaveGroupHandler = () => {
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId)
        closeHandler()
    }

    const DeleteChatHandler = () => {
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId)
        closeHandler()
    }

    useEffect(()=> {
        if(deleteChatData || leaveGroupData) navigate("/")
    }, [deleteChatData, leaveGroupData, navigate])
 
  return <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteOptionAnchor} anchorOrigin={{vertical: "bottom", horizontal: "right"}} transformOrigin={{vertical: "center", horizontal: "center"}} >
    <Stack sx={{width: "10rem", padding: "0.5rem", cursor: "pointer"}} direction={"row"} alignItems={"center"} spacing={"0.5rem"} onClick={isGroup? LeaveGroupHandler : DeleteChatHandler} >
        {
            isGroup? (
                <>
                    <ExitToAppIcon />
                    <Typography>Leave Group</Typography>
                </>
            ) : (
                <>
                    <DeleteIcon />
                    <Typography>Delete Chat</Typography>
                </>
            )
        }
    </Stack>
  </Menu>
}

export default DeleteChatMenu
