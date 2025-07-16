import { Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import AvatarShared from './AvatarShared'

const ChatItem = ({avatar=[], name, _id, groupChat = false, sameSender, isOnline, newMessageAlert, index=0, handleDeleteChat}) => {


  return (
    <Link   style={{textDecoration: "none", color: "black", padding: "1rem", display: "block"}} to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
        <motion.div initial={{opacity: 0, y: "-100%"}} whileInView={{opacity: 1, y: 0}} transition={{delay: index * 0.1}} style={{display: "flex", gap:"1rem", alignItems: "center", padding: "1rem", backgroundColor: sameSender ? "black": "unset", color: sameSender ? "white": "unset", position: "relative"}}>
            <AvatarShared avatar={avatar} />
            <Stack>
                <Typography>{name}</Typography>
                {newMessageAlert && (<Typography>{newMessageAlert.count} New Message </Typography>)}
            </Stack>
            {isOnline && (
                <Box sx={{width: "10px", height: "10px", borderRadius: "50%", position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)",  backgroundColor: "green"}} />
            )}
        </motion.div>
    </Link>
  )
}

export default memo(ChatItem)
