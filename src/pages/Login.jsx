import React, { useState } from 'react'
import { Avatar, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponent'
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { emailVaidator, usernameVaidator } from '../utils/validators'
import axios from 'axios'
import { server } from '../components/constants/config'
import { useDispatch } from 'react-redux'
import { userExits } from '../redux/reducer/auth'
import toast from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch()

    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const toggleLogin = () => setIsLogin((prev) => !prev)

    const email = useInputValidation("", emailVaidator)
    const bio = useInputValidation("")
    const name = useInputValidation("")
    const username = useInputValidation("", usernameVaidator)
    const password = useStrongPassword()

    const avatar = useFileHandler("single")

    const handleLogin = async(e) => {
        e.preventDefault()
        const toastId = toast.loading("Logging In...")
        setIsLoading(true)
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const {data} = await axios.post(`${server}/user/login`, {
                    username: username.value,
                    password: password.value
                },
                config
            ) 
            dispatch(userExits(data.user))
            toast.success(data.message, {id: toastId})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong", {id: toastId})   
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignup = async(e) => {
        e.preventDefault()
        const toastId = toast.loading("Signing Up...")
        setIsLoading(true)
        const formData = new FormData()
        formData.append("avatar", avatar.file)
        formData.append("name", name.value)
        formData.append("username", username.value)
        formData.append("password", password.value)
        formData.append("email", email.value)
        formData.append("bio", bio.value)

        try {
            const {data} = await axios.post(`${server}/user/new`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(userExits(data.user))
            toast.success(data.message, {id: toastId})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong", {id: toastId})
        } finally {
            setIsLoading(false)
        }
    }

  return( 
    <Container component={"main"} maxWidth="xs" sx={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Paper elevation={3} sx={{padding: 4, display:"flex", flexDirection: "column", alignItems: "center"}}>
            {
                isLogin ? 
                (<>
                    <Typography variant='h5'>Login</Typography>
                    <form style={{width: "100%", marginTop: "1rem"}} onSubmit={handleLogin}>
                        <TextField required fullWidth label="Username" margin='normal' variant='outlined' value={username.value} onChange={username.changeHandler}/>
                        {username.error && (
                            <Typography color='error' variant='caption'>
                                {username.error}
                            </Typography>
                        )}
                        <TextField required fullWidth label="Password" type='password' margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler}/>
                        {password.error && (
                            <Typography color='error' variant='caption'>
                                {password.error}
                            </Typography>
                        )}
                        <Button sx={{marginTop: "1rem"}} fullWidth variant='contained' color='primary' type='submit' disabled={isLoading} >Login</Button>
                        <Typography sx={{marginTop: "1rem"}} textAlign={"center"}>OR</Typography>
                        <Button fullWidth variant='text' onClick={toggleLogin} disabled={isLoading} >Register</Button>
                    </form>
                </>)
                 : 
                 (<>
                    <Typography variant='h5'>Sign-Up</Typography>
                    <form style={{width: "100%", marginTop: "1rem"}} onSubmit={handleSignup}>
                        <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                            <Avatar sx={{width:"10rem", height:"10rem", objectFit:"contain"}} src={avatar.preview} />
                            <IconButton sx={{position: "absolute", bottom:0, right:0, color: "black", bgcolor: "rgba(0,0,0,0.5", ":hover": {bgcolor: "rgba(0,0,0,0.7"}}} component="label">
                                <>
                                    <CameraAltIcon/>
                                    <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                                </>
                            </IconButton>
                        </Stack>
                        {avatar.error && (
                        <Typography color='error' variant='caption'm={"1rem auto"} width={"fit-content"} display={'block'}>
                            {avatar.error}
                        </Typography>
                        )}
                        <TextField required fullWidth label="Email" type='email' margin='normal' variant='outlined' value={email.value} onChange={email.changeHandler}/>
                        {email.error && (
                            <Typography color='error' variant='caption'>
                                {email.error}
                            </Typography>
                        )}
                        <TextField required fullWidth label="Name" margin='normal' variant='outlined' value={name.value} onChange={name.changeHandler}/>
                        <TextField required fullWidth label="Bio" margin='normal' variant='outlined' value={bio.value} onChange={bio.changeHandler}/>
                        <TextField required fullWidth label="Username" margin='normal' variant='outlined' value={username.value} onChange={username.changeHandler}/>
                        {username.error && (
                            <Typography color='error' variant='caption'>
                                {username.error}
                            </Typography>
                        )}
                        <TextField required fullWidth label="Password" type='password' margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler}/>
                        {password.error && (
                            <Typography color='error' variant='caption'>
                                {password.error}
                            </Typography>
                        )}
                        <Button sx={{marginTop: "1rem"}} fullWidth variant='contained' color='primary' type='submit' disabled={isLoading} >Signup</Button>
                        <Typography sx={{marginTop: "1rem"}} textAlign={"center"}>OR</Typography>
                        <Button fullWidth variant='text' onClick={toggleLogin} disabled={isLoading} >Login</Button>
                    </form>
                </>)
            }
        </Paper>
    </Container>
    )
}

export default Login
