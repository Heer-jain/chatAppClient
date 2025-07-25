import React from 'react'
import { Grid, Skeleton, Stack } from '@mui/material'
import { BouncingSkeleton } from '../styles/StyledComponent'

const LayoutLoaders = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} width={"100vw"}>
        <Grid item sm={4} md={3} sx={{display: {xs:"none", sm:"block"}}} height={"100%"} bgcolor={"#DEDFE4"}></Grid>
        <Skeleton variant='rectangular'/>
        <Grid item xs={12} sm={8} md={5} lg={6} height={"10%"} bgcolor={"#DEDFE4"} paddingX={1}>
            <Stack spacing={"1rem"}>
                {Array.from({ length: 10}).map((_, index) => (
                    <Skeleton key={index} variant='rectangular' height={"5rem"} />
                ))}
            </Stack>
        </Grid>
        <Grid item md={4} lg={3} sx={{display: {xs:"none", md:"block"}}} height={"100%"} bgcolor={"#DEDFE4"}></Grid>
        <Skeleton variant='rectangular'/>
    </Grid>
  )
}

export default LayoutLoaders

const TypingLoader = () => {
  return (
    <Stack spacing={"0.5rem"} direction={"row"} padding={"0.5rem"} justifyContent={"center"} >
      <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay: "0.1s"}} />
      <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay: "0.2s"}} />
      <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay: "0.4s"}} />
      <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay: "0.6s"}} />
    </Stack>
  )
}

export { TypingLoader }
