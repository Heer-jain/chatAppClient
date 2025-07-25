import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'
import { memo } from 'react'
import { transformImage } from '../../lib/Features'

const UserItem = ({user, handler, handleIsLoading, isAdded=false, styling={}}) => {

    const {name, _id, avatar} = user

  return (
    <ListItem >
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} {...styling}>
            <Avatar src={transformImage(avatar.url)} />
            <Typography variant='body1' sx={{flexGrow: 1, width:"100%", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis"}}>{name}</Typography>
            <IconButton size='small' sx={{bgcolor:isAdded ? "error.main" : "primary.main", color: 'white', "&:hover": {bgcolor:isAdded? "error.dark" : "primary.dark"}}} onClick={() => handler(_id)} disabled={handleIsLoading} >
              {isAdded ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)
 