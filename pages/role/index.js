import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const Role = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/role/auth')
  }, [])
  return <div></div>
}

export default Role
