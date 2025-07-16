import { Avatar, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { transformImage } from '../../lib/Features'
import { useGetUserDataQuery } from '../../redux/api/api'

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
  renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
},
{
  field: "email",
  headerName: "Email",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "name",
  headerName: "Name",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "friends",
  headerName: "Friends",
  headerClassName: "table-header",
  width: 150,
},
{
  field: "groups",
  headerName: "Groups",
  headerClassName: "table-header",
  width: 200,
}
]
const UserManagment = () => {

  const {isLoading, data, isError, error} = useGetUserDataQuery()

  console.log("data", data)

  useErrors([{isError, error}])

  const [rows, setRows] = useState([])

  useEffect(() => {
    if(data){
      setRows(data.transformedUser.map(i=>({...i, id:i._id, avatar: transformImage(i.avatar, 50)})))
    }
  }, [data])
  

  return (
    <AdminLayout>
        {
          isLoading? (<Skeleton height={"100vh"} />) : (
            <Table heading={"All Users"} rows={rows} columns={columns} />
          )
        }
    </AdminLayout>
  )
}

export default UserManagment
