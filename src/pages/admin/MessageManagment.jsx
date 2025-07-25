import { Avatar, Box, Skeleton, Stack } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import RenderAttachment from '../../components/shared/RenderAttachment'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { fileFormat, transformImage } from '../../lib/Features'
import { useGetMessageDataQuery } from '../../redux/api/api'

const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "attachment",
  headerName: "Attachment",
  headerClassName: "table-header",
  width: 200,
  renderCell: (params) => {
    const {attachment} = params.row
    return attachment?.length > 0 ? 
      attachment.map(i=>{
        const url = i.url
        const file = fileFormat(url)
        return <Box>
          <a href={url} download target='_blank' style={{color:"black"}} >
            {RenderAttachment(file, url)}
          </a>
        </Box>
      })
       : 
      "NO Attachment"
  }
},
{
  field: "content",
  headerName: "Content",
  headerClassName: "table-header",
  width: 400,
},
{
  field: "sender",
  headerName: "Sent By",
  headerClassName: "table-header",
  width: 200,
  renderCell: (params) => <Stack direction={"row"} spacing={"0.5rem"} justifyContent={"center"} alignItems={"center"}>
    <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
    <span>{params.row.sender.name}</span>
  </Stack> 
},
{
  field: "chat",
  headerName: "Chat",
  headerClassName: "table-header",
  width: 220,
},
{
  field: "groupChat",
  headerName: "Group Chat",
  headerClassName: "table-header",
  width: 100,
},
{
  field: "createdAt",
  headerName: "Time",
  headerClassName: "table-header",
  width: 250,
}
]

const MessageManagment = () => {

  const {isLoading, data, isError, error} = useGetMessageDataQuery()

  useErrors([{isError, error}])

  const [rows, setRows] = useState([])

  useEffect(() => {
    if(!data) return
    setRows(data.transformedMessages.map((i) => ({...i, 
      id: i._id,
      sender: {
        name: i.sender.name,
        avatar: transformImage(i.sender.avatar, 50)
      },
      createdAt: moment(i.createdAt).format("MMMM DD YYYY, h:mm:ss a")
    })))
  }, [data])
  

  return (
    <AdminLayout>
        {
          isLoading ? (<Skeleton height={"100vh"} />) : (
            <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200} />
          )
        }
    </AdminLayout>
  )
}

export default MessageManagment
