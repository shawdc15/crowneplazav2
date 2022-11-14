import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const Admin = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/admin/guests')
  }, [])
  return <></>
}

export default Admin
