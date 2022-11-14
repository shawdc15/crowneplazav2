import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { reservationReports } from '../../services/reservation.services'

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
  const data_items = [
    {
      id: '10001',
      name: 'John Doe',
      checkin: '03/20/2022',
      checkout: '03/21/2022',
      roomType: 'Standard',
      roomNo: '201',
      extraBeds: 1,
      voucherCode: 'None',
    },
    {
      id: '10002',
      name: 'Steve Harvey',
      checkin: '03/20/2022',
      checkout: '03/22/2022',
      roomType: 'Executive',
      roomNo: '601',
      extraBeds: 0,
      voucherCode: 'FREEGRAB',
    },
  ]
  return (
    <>
      <Head>
        <title>Reservation Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
