import { Avatar, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import AvatarShared from '../../components/shared/AvatarShared'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { transformImage } from '../../lib/Features'
import { useGetChatDataQuery } from '../../redux/api/api'

const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "avatar",
  headerName: "Avatar",
  headerClassName: "table-header",
  width: 150,
  renderCell: (params) => <AvatarShared alt={params.row.name} avatar={params.row.avatar} />
},
{
  field: "name",
  headerName: "Name",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "groupChat",
  headerName: "Group Chat",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "totalMembers",
  headerName: "Total Members",
  headerClassName: "table-header",
  width: 120,
},
{
  field: "members",
  headerName: "Members",
  headerClassName: "table-header",
  width: 400,
  renderCell: (params) => <AvatarShared max={100} avatar={params.row.members} />
},
{
  field: "totalMessages",
  headerName: "Total Messages",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "creator",
  headerName: "Created By",
  headerClassName: "table-header",
  width: 250,
  renderCell: (params) => <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
    <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
    <span>{params.row.creator.name}</span>
  </Stack> 
}
]

const ChatManagment = () => {

  const {isLoading, data, isError, error} = useGetChatDataQuery()

  useErrors([{isError, error}])

  const [rows, setRows] = useState([])

  useEffect(() => {
    if (!data || !data.transformedChats) return;
  
    setRows(data.transformedChats.map(i => ({
      ...i,
      id: i._id,
      avatar: i.avatar.map(i => transformImage(i, 50)),
      members: i.members.map((i) => transformImage(i.avatar, 50)),
      creator: {
        name: i.creator.name,
        avatar: transformImage(i.creator.avatar, 50)
      }
    })));
  }, [data]);
  
  

  return (
    <AdminLayout>
        {
          isLoading? (<Skeleton height={"100vh"} />) : (
            <Table heading={"All Chats"} rows={rows} columns={columns} />
          )
        }
    </AdminLayout>
  )
}


export default ChatManagment
