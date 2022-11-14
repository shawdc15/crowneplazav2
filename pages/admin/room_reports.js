import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { getLogs } from '../../services/logreport.services'

const RoomReports = () => {
  const [data, setData] = useState()
  useEffect(async () => {
    const { success, data } = await getLogs()
    if (success) {
      setData(data)
    }
  }, [])
  const data_headers = [
    {
      name: 'ID No#',
      key: '_id',
    },
    {
      name: 'Date',
      key: 'date',
    },
    {
      name: 'Room #',
      key: 'preferredRoom',
    },
    {
      name: 'Room Type',
      key: 'roomType',
    },
    {
      name: 'Room Status',
      key: 'roomStatus',
    },
    {
      name: 'Reservation Status',
      key: 'reservationStatus',
    },
  ]
  return (
    <>
      <Head>
        <title>Room Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        searchKey="reservationStatus"
        title="Room Reports"
        data_headers={data_headers}
        data_items={data}
      />
    </>
  )
}

export default RoomReports
