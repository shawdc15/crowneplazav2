import React from 'react'
import { CancelledList } from '../../../components'

const Cancelled = () => {
  return (
    <>
      <CancelledList role={'manager'} status="request cancellation" />
    </>
  )
}

export default Cancelled
