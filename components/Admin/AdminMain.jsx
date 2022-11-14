import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTable from './AdminTable'

const AdminMain = ({ title, data_headers, data_items, searchKey, duga }) => {
  const [nav, setNav] = useState(false)
  return (
    <div className={`flex min-h-screen ${nav ? 'overflow-hidden' : ''}`}>
      <AdminSidebar nav={nav} />
      <div className="w-full p-4 lg:p-10">
        <AdminTable
          searchKey={searchKey}
          data_headers={data_headers}
          data_items={data_items}
          modalType={title}
          title={title}
          duga={duga}
          nav={nav}
          setNav={setNav}
        />
      </div>
    </div>
  )
}

export default AdminMain
