import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header } from '../components'
const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/customer')
  }, [])
  return (
    <>
      <Header />
      <p className="mb-auto py-10 text-center">Redirecting...</p>
    </>
  )
}

export default Home
