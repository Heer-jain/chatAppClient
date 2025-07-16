import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { setIsNewGroup } from '../../redux/reducer/misc'
import UserItem from '../shared/UserItem'
import toast from 'react-hot-toast'

const NewGroup = () => {

  const dispatch = useDispatch()
  const {isNewGroup} = useSelector(state=>state.misc)
  const groupName = useInputValidation("")

  const {isError, error, isLoading, data} = useAvailableFriendsQuery("")
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [{isError, error}]

  useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers(prev => (prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) : [...prev, id]))
  }

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required")
    if(selectedMembers.length < 2) return toast.error("Please select atleast two members")
    newGroup("Creating New Group...", {name: groupName.value, members: selectedMembers})
    closeHandler()
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
    <Stack p={{xs: "1rem", sm: "2rem"}} width={"30rem"} spacing={"1rem"}>
      <DialogTitle textAlign={"center"} variant='h4' >New Group</DialogTitle>
      <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
      <Typography>Members</Typography>
      <Stack>
        {isLoading? (<Skeleton />) : (data?.friends?.map((i) => (
          <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
        )))}
      </Stack>
      <Stack direction={"row"} justifyContent={"space-evenly"} >
        <Button variant='text' color='error' onClick={closeHandler}>Cancel</Button>
        <Button variant='contained' onClick={submitHandler} disabled={isLoadingNewGroup} >Create</Button>
      </Stack>
    </Stack>
  </Dialog>
  )
}

export default NewGroup
