import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationIcon, Person as PersonIcon } from '@mui/icons-material'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import LayoutLoaders from '../../components/layout/Loaders'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { CurveButton, SearchField } from '../../components/styles/StyledComponent'
import { useGetStatsQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'

const Dashboard = () => {

  const {isLoading, data, isError, error} = useGetStatsQuery()

  const { stats } = data || {}

  useErrors([{isError, error}])

  const AppBar = <Paper elevation={3} sx={{padding:"2rem", margin: "2rem 0", borderRadius:"1rem"}} >
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AdminPanelSettingsIcon sx={{fontSize: "3rem"}} />
      <SearchField />
      <CurveButton>Search</CurveButton>
      <Box flexGrow={1} />
      <Typography display={{xs: "none", lg:"block"}} color={"rgba(0,0,0,0.7)"} textAlign={"center"} >
        {moment().format("dddd, DD MMMM YYYY")}
      </Typography>
      <NotificationIcon />
    </Stack>
  </Paper>

  const Widgets = 
  <Stack direction={{xs: "column", sm: "row"}} spacing={"2rem"} justifyContent={"space-between"} alignItems={"center"} margin={"2rem 0"}>
    <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
    <Widget title={"Chats"} value={stats?.totalChatCounts} Icon={<GroupIcon />} />
    <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon />} />
  </Stack>

  return (
    <AdminLayout>
      {
        isLoading? (<Skeleton height={"100vh"} />) : (
          <Container component={"main"}>
          {AppBar}
          <Stack direction={{xs: "column", lg: "row"}} flexWrap={"wrap"} justifyContent={"center"} alignItems={{xs: "center", lg: "strech"}} sx={{gap:"2rem"}} >
            <Paper elevation={3} sx={{padding: "2rem 3.5rem", borderRadius: "1rem", width: "100%", maxWidth: "45rem"}}>
              <Typography margin={"2rem 0"} variant='h4' >Last Messages</Typography>
              <LineChart value={stats?.messages || []} />
            </Paper>
            <Paper elevation={3} sx={{padding:"1rem", borderRadius: "1rem", display:"flex", justifyContent:"center", alignItems: "center", width: {xs: "100%", sm: "50%"}, position: "relative", maxWidth: "25rem", height:"100%"}}>
              <DoughnutChart value={[stats?.totalChatCounts - stats?.groupsCount || 0, stats?.groupsCount || 0]} labels={["Single Chats", "Group Chats"]} />
              <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"0.5rem"} width={"100%"} height={"100%"} >
                <GroupIcon />
                <Typography>VS</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {Widgets}
        </Container>
        )
      }
    </AdminLayout>
  )
}

const Widget = ({title, value, Icon}) =>  <Paper sx={{padding: "2rem", margin: "2rem 0", borderRadius: "1.5rem", width: "20rem"}}>
    <Stack alignItems={"center"} spacing={"1rem"} >
      <Typography sx={{color: "rgba(0,0,0,0.7)", borderRadius:"50%", border:"5px solid rgba(0,0,0,0.9)", width: "5rem", height: "5rem", display: "flex", justifyContent: "center", alignItems: "center" }} >{value}</Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>


export default Dashboard 