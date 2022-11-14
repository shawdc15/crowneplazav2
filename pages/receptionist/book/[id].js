import React from 'react'
import { BookCard, RoleHeader } from '../../../components'
import { useRouter } from 'next/router'
const Book = () => {
  const router = useRouter()
  let id = router.query.id
  return (
    <BookCard id={id} role="receptionist">
      <RoleHeader active="book" role="receptionist" />
    </BookCard>
  )
}

export default Book
