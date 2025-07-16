import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, {useState} from 'react'
import { SampleUsers } from '../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducer/misc'

const AddMemberDialog = ({chatId}) => {

    const dispatch = useDispatch()

    const [selectedMembers, setSelectedMembers] = useState([])

    const [addMembers, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation)
    const { isAddMember } = useSelector(state=>state.misc)
    const {isLoading, isError, error, data} = useAvailableFriendsQuery(chatId)

    const members = data?.friends

    const selectMemberHandler = (id) => {
    setSelectedMembers(prev => (prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) : [...prev, id]))
    }

    const addMemberSubmitHandler = () => {
        addMembers("Adding member...", {members: selectedMembers, chatId})
        closeHandler()
    }

    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }

    const errors = [{isError, error}]

    useErrors(errors)

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
            <Stack>
                {   
                    isLoading? <Skeleton /> : (members.length > 0 ? members.map((i) => (
                        <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
                    )) : <Typography textAlign={"center"}>No Friends</Typography>)
                }
            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"} >
                <Button color='error' onClick={closeHandler} >Cancle</Button>
                <Button variant='contained' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler} >Submit Changes</Button>
            </Stack>
        </Stack>
    </Dialog>
  ) 
}

export default AddMemberDialog
