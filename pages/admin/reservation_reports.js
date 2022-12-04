import React, { useState, useEffect } from 'react'
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
  return (
    <>
      <Head>
        <title>Reservation Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

      <AdminMain
        searchKey="_id"
        title="Reservation Reports"
        data_headers={data_headers}
        data_items={data}
      />
    </>
  )
}

export default ReservationReports
