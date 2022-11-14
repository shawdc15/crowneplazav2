import React, { useEffect } from 'react'
import Head from 'next/head'
import { HousekeepingRooms, Loading, RoleHeader } from '../../../components'
import { getActiveAccommodation } from '../../../services/accommodation.services'
import { useAppContext } from '../../../context/AppContext'
const Rooms = () => {
  const { state, dispatch } = useAppContext()
  const { isLoading, accomodationList } = state
  useEffect(async () => {
    dispatch({ type: 'ACCOMODATION_REQUEST' })
    const res = await getActiveAccommodation()

    if (res.success) {
      setTimeout(() => {
        dispatch({ type: 'ACCOMODATION_SUCCESS', value: res.data })
      }, 500)
    } else {
      dispatch({ type: 'ACCOMODATION_ERROR' })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Manager Rooms | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="room" role="manager" />
      <HousekeepingRooms
        active="manager"
        list={accomodationList}
        isLoading={isLoading}
      />
    </>
  )
}

export default Rooms
