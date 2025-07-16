import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from '../../redux/api/api'
import { setIsNotification } from '../../redux/reducer/misc'

const Notification = () => {

  const dispatch = useDispatch()
  const {isNotification} = useSelector(state=>state.misc)
  const {isLoading, data, isError, error} = useGetNotificationQuery()
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation)

  const friendRequestHandler = async({_id, accept}) => {
    dispatch(setIsNotification(false))
    await acceptRequest("Accepting...", {requestId: _id, accept})
  }

  useErrors([{isError, error}])

  const handleClose = () => dispatch(setIsNotification(false))

  return (
    <Dialog open={isNotification} onClose={handleClose}>
      <Stack p={{xs: "1rem", sm: "2rem"}} maxWidth={"30rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? (<Skeleton />) : (<>
            {
          data?.allRequests.length > 0 ? 
           (data?.allRequests?.map((i) => <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id} />))
          : 
          (<Typography textAlign={"center"}>0 notifications</Typography>)
        }
          </>)
        }
      </Stack>
    </Dialog>
  )
}
const NotificationItem = memo(({sender, _id, handler}) => {
  const {name, avatar} = sender
  return (
    <ListItem >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
          <Avatar src={avatar}/>
          <Typography variant='body1' sx={{flexGrow: 1, width:"100%", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis"}}>{`${name} sent you friend request`}</Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
            <Button onClick={() => handler({_id, accept:true})}>Accept</Button>
            <Button color='error' onClick={() => handler({_id, accept:false})}>Reject</Button>
          </Stack>
      </Stack>
    </ListItem>
  )
})


export default Notification
