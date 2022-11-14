import React, { useEffect } from 'react'
import Head from 'next/head'
import { useAppContext } from '../../context/AppContext'
import { AdminMain, AdminSidebar, VoucherModal } from '../../components'
import { getAllAccommodation } from '../../services/accommodation.services'

const Rooms = () => {
  const { state, dispatch } = useAppContext()

  const data_headers = [
    {
      name: 'ID No#',
      key: '_id',
    },
    {
      name: 'Room Name',
      key: 'roomName',
    },
    {
      name: 'Room No#',
      key: 'roomNo',
    },
    {
      name: 'Rate',
      key: 'price',
    },
  ]
  useEffect(async () => {
    dispatch({ type: 'CLEAR_SELECTED_DATA' })
    const { success, data } = await getAllAccommodation()
    if (success) {
      dispatch({ type: 'SET_SELECTED_DATA', value: data })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Rooms | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        searchKey="roomName"
        title="Rooms"
        data_headers={data_headers}
        data_items={state.selectedData}
      />
    </>
  )
}

export default Rooms
