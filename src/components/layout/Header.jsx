import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon, Search as SearchIcon, Menu as MenuIcon} from '@mui/icons-material'
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { lightTeal } from '../constants/Color'
import axios from 'axios'
import { server } from '../constants/config'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExits } from '../../redux/reducer/auth'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducer/misc'
import { resetNotification } from '../../redux/reducer/chat'

const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationDialog = lazy(() => import("../specific/Notification"))
const NewGroupDialog = lazy(() => import("../specific/NewGroup"))

const Header = () => {

    const {isSearch, isNotification, isNewGroup} = useSelector(state=>state.misc)
    const {notificationCount} = useSelector((state)=>state.chat)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleMobile = () => dispatch(setIsMobile(true))

    const handleSearch = () => dispatch(setIsSearch(true))

    const createNewGroup = () => dispatch(setIsNewGroup(true))

    const navigateToGroups = () => {
        navigate('/groups')
    }

    const notifications = () => {
        dispatch(setIsNotification(true))
        dispatch(resetNotification())
    }

    const handleLogout = async() => {
        try {
            const {data} = await axios.get(`${server}/user/logout`, {withCredentials: true})   
            dispatch(userNotExits())
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.respone?.data?.message || "Something went wrong")
        }
    }

  return (
    <>
        <Box sx={{flexGrow: 1}} height="4rem" >
            <AppBar position='static' sx={{bgcolor: lightTeal}}>
                <Toolbar>
                    <Typography variant='h6' sx={{display: { xs: "none", sm: "flex" }}}>Chatting Setting</Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display:{xs: "block", sm: "none"}}}>
                    <IconButton color='inherit' onClick={handleMobile}>
                        <MenuIcon />
                    </IconButton>
                    </Box>
                    <Box>
                    <IconBtn title={"Search"} onClick={handleSearch} icon={SearchIcon}/>
                    <IconBtn title={"New Group"} onClick={createNewGroup} icon={AddIcon}/>
                    <IconBtn title={"Manage Groups"} onClick={navigateToGroups} icon={GroupIcon}/>
                    <IconBtn title={"Notification"} onClick={notifications} icon={NotificationsIcon} value={notificationCount}/>
                    <IconBtn title={"Logout"} onClick={handleLogout} icon={LogoutIcon}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
        {isSearch && (
        <Suspense fallback={<Backdrop open />}>
            <SearchDialog open={isSearch} onClose={() => setIsSearch(false)} />
        </Suspense>
        )}

        {isNotification && (
        <Suspense fallback={<Backdrop open />}>
            <NotificationDialog open={isNotification} onClose={() => setIsNotification(false)} />
        </Suspense>
        )}

        {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
            <NewGroupDialog open={isNewGroup} onClose={() => setIsNewGroup(false)} />
        </Suspense>
        )}

    </>
  )
}

const IconBtn = ({title, icon: Icon, onClick, value}) => {
    return(
        <Tooltip title={title}>
        <IconButton color='inherit' onClick={onClick} size='large'>
            {
                value? (
                    <Badge badgeContent={value} color='error'>
                        <Icon />
                    </Badge>
                ) : (
                    <Icon />
                )}
        </IconButton>
        </Tooltip>
    )
}

export default Header
