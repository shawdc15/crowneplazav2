import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { reservationReports } from '../../services/reservation.services'
import Script from 'next/script'

const ReservationReports = () => {
  const [data, setData] = useState()
  useEffect(async () => {
    const res = await reservationReports()
    if (res.success) {
      setData(res?.data)
      console.log(res?.data)
    }
  }, [])
  const data_headers = [
    {
      name: 'ID No#',
      key: '_id',
    },
    {
      name: 'Name',
      key: 'customerName',
    },
    {
      name: 'Check-in',
      key: 'checkIn',
    },
    {
      name: 'Check-out',
      key: 'checkOut',
    },
    {
      name: 'Room Type',
      key: 'roomType',
    },
    {
      name: 'Room No#',
      key: 'preferredRoom',
    },
    {
      name: 'Extra Beds',
      key: 'noOfExtraBed',
    },
    {
      name: 'Status',
      key: 'status',
    },
    // {
    //   name: 'Voucher Code',
    //   key: 'voucherCode',
    // },
  ]
  const [statusState,setStatusState] = useState("")
  return (
    <>
      <Head>
        <title>Reservation Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

      <AdminMain
        searchKey="name"
        title="Reservation Reports"
        data_headers={data_headers}
        data_items={data}
        filteredButtons={[{key:"status",setter:setStatusState,getter:statusState,choices:['approved', 'checkedIn', 'checkedOut', 'reserved']}]}
      />
    </>
  )
}

export default ReservationReports
