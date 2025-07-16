import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { memo } from 'react'
import { fileFormat, transformImage } from '../../lib/Features'
import RenderAttachment from './RenderAttachment'
import {motion} from 'framer-motion'

const MessageComponent = ({message, user}) => {

    const {sender, content , attachment = [] , createdAt } = message

    const sameSender = sender?._id === user?._id

    const TimeAgo = moment(createdAt).fromNow()

  return (
    <motion.div initial={{opacity: 0, x: "-100%"}} whileInView={{opacity: 1, x: 0}} style={{alignSelf: sameSender? "flex-end" : "flex-start", backgroundColor:sameSender?"rgba(0, 128, 0, 0.2)" : "white", color:"black", borderRadius: "5px", padding: '0.5rem', width: "fit-content"}} >
        {!sameSender && <Typography color={"primary"} fontWeight={"600"} variant='caption'>{sender.name}</Typography>}
        {content && <Typography>{content}</Typography>}
        {attachment.length > 0 && attachment.map((attachment, index) => {
            const url = transformImage(attachment.url)
            const file = fileFormat(url)
            return <Box key={index}>
                <a href={url} target='blank' download style={{color: "black"}} >
                    {RenderAttachment(file, url)}
                </a>
            </Box>
        })}
        <Typography variant='caption' color={"gray"}>{TimeAgo}</Typography>
    </motion.div>
  )
}

export default memo(MessageComponent)
