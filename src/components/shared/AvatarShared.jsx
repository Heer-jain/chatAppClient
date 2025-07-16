import { AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import { transformImage } from '../../lib/Features'

const AvatarShared = ({avatar = [], max = 4}) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
        <AvatarGroup max={max} sx={{position: "relative"}} >
            <Box width={"5rem"} height={"3rem"}>
            {avatar.map((i, index) => (
            <img
              key={index}
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              style={{
                width: "2rem",
                height: "2rem",
                position: "absolute",
                left: `${index * 1.5}rem`,
              }}
            />
          ))}
            </Box>
        </AvatarGroup>
    </Stack>
)}

export default AvatarShared