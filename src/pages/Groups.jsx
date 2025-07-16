import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Backdrop, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { TransTeal } from '../components/constants/Color'
import LayoutLoaders from '../components/layout/Loaders'
import AvatarShared from '../components/shared/AvatarShared'
import UserItem from '../components/shared/UserItem'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api'
import { setIsAddMember } from '../redux/reducer/misc'

const ConfirmDeleteDialog = lazy(() =>import("../components/dialog/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() =>import("../components/dialog/AddMemberDialog"))

const Groups = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [members, setMembers] = useState([])

  const {isAddMember} = useSelector(state=>state.misc)

  const chatId = useSearchParams()[0].get("groups")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const myGroups = useMyGroupsQuery("")
  const groupDetails = useChatDetailsQuery({chatId, populate: true}, {skip: !chatId})
  const [renameGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteChat, isLoadingChatDelete] = useAsyncMutation(useDeleteChatMutation)

  useEffect(() => {
    if(chatId){
      setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }

    return ()=>{
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }
  }, [chatId])

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error
    }
  ]
  
  useErrors(errors)

  useEffect(()=>{
    if(groupDetails.data){
      setGroupName(groupDetails?.data?.chat?.name)
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name)
      setMembers(groupDetails?.data?.chat?.members)
    }
    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setMembers([])
      setIsEdit(false)
    }
  },[groupDetails.data])

  const navigateBack = () => {
    navigate('/')
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }

  const updateGroupName = () => {
    setIsEdit(false)
    renameGroup("Renaming Group...", {chatId, name: groupNameUpdatedValue})
  }

  const OpenConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const deleteHandler = () => {
    deleteChat("Deleting Group...", chatId)
    closeConfirmDeleteHandler()
    navigate('/groups')
  }

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", {chatId, userId})
  }

  const IconBtns = 
    <>
    <IconButton sx={{display:{xs: "block", sm: "none", position:"fixed", right:"2rem", top:"2rem"}}} onClick={handleMobile} >
      <MenuIcon />
    </IconButton>
     <Tooltip title="back">
        <IconButton sx={{position:"absolute", top:"2rem", left:"2rem", bgcolor:"gray", color:"white", ":hover":{bgcolor: "black"}}} onClick={navigateBack}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>

    const GroupName = <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
        {
          isEdit? (<>
          <TextField value={groupNameUpdatedValue} onChange={e => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName} >
            <DoneIcon />
          </IconButton>
          </> 
          ) : ( 
          <>
            <Typography variant='h4' >{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName} >
              <EditIcon />
            </IconButton>
          </>
        )
        }
    </Stack>

    const ButtonGroup = <Stack direction={{sm: "row", xs:"column-reverse"}} spacing={"1rem"} p={{sm: '1rem', xs: "0", md: "1rem 4rem"}}>
      <Button size='large' startIcon={<DeleteIcon />} color='error' onClick={OpenConfirmDeleteHandler} >Delete Group</Button>
      <Button size='large' startIcon={<AddIcon />} variant='contained' onClick={openAddMemberHandler} >Add Member</Button>
    </Stack>

  return myGroups.isLoading ? <LayoutLoaders /> : (
    <Grid container height={"100vh"}>
      <Grid item sm={4} sx={{display:{xs: "none", sm: 'block'}}} >
        <GroupList myGroups={myGroups?.data?.message} chatId={chatId} />
      </Grid>

      <Grid item xs={12} sm={8} sx={{display: "flex", flexDirection:"column", alignItems: "center", position:"relative", padding:"1rem 3rem"}} > 
        {IconBtns} 
        {groupName && <>
          {GroupName}
          <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body'>Members</Typography>
          <Stack maxWidth={"45rem"} width={"100%"} boxSizing={"border-box"} padding={{sm: "1rem", xs:"0", md:'1rem 4rem'}} spacing={"2rem"} height={"50vh"} overflow={"auto"}>
            {
              isLoadingRemoveMember? <CircularProgress /> : (members.map((i) => (
                <UserItem key={i._id} user={i} isAdded styling={{boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)", padding: "1rem 2rem", borderRadius: "1rem"}} handler={removeMemberHandler} />
              )))
            }
          </Stack>
          {ButtonGroup}
        </>}
      </Grid>

      {
        isAddMember && <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} />
        </Suspense>
      }

      <Drawer sx={{display: {xs: "block", sm:"none"}}} open={isMobileMenuOpen} onClose={handleMobileClose} >
        <GroupList w={"50vw"} myGroups={myGroups?.data?.message} chatId={chatId} />
      </Drawer>
    </Grid>
  )
}

const GroupList = ({w="100%", myGroups=[], chatId}) => (
  <Stack width={w} bgcolor={TransTeal} height={"100vh"} overflow={"auto"} >
    {
      myGroups.length > 0 ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} /> ) : <Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>
    }
  </Stack>
)

const GroupListItem = memo(({group, chatId}) => {
  const {name, avatar, _id} = group
  return (<Link to={`?groups=${_id}`} onClick={(e)=> {if(chatId===_id) e.preventDefault()}} >
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <AvatarShared />
      <Typography>{name}</Typography>
    </Stack>
  </Link>)
})

export default Groups