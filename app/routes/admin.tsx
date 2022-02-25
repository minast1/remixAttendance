import React from 'react'
import { Outlet } from 'remix'
import AdminLayout from '~/src/components/lecturers/AdminLayout'

const AdminRoute = () => {
  return (
    <AdminLayout>
       <Outlet/>
   </AdminLayout>
  )
}

export default AdminRoute