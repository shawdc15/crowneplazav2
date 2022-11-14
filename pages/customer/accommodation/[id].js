import React from 'react'
import { BookCard, Header } from '../../../components'
import { useRouter } from 'next/router'
const Accommodation = () => {
  const router = useRouter()
  let id = router.query.id
  return (
    <BookCard id={id} role="customer">
      <Header active="accommodation" />
    </BookCard>
  )
}

export default Accommodation
