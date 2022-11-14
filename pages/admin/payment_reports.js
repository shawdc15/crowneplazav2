import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { paymentReports } from '../../services/receipt.services'

const Payment = () => {
  const [data, setData] = useState()
  useEffect(async () => {
    const { success, data } = await paymentReports()
    if (success) {
      setData(data)
    }
  }, [])
  const data_headers = [
    {
      name: 'ID No#',
      key: 'reservation_id',
    },
    {
      name: 'Reference No.',
      key: '_id',
    },
    {
      name: 'Name',
      key: 'receiptFor',
    },
    {
      name: 'Channel',
      key: 'channel',
    },
    {
      name: 'Room No',
      key: 'preferredRoom',
    },
    {
      name: 'Room Type',
      key: 'roomType',
    },
    {
      name: 'Amount',
      key: 'total',
    },
    {
      name: 'Date',
      key: 'created_at',
    },
  ]
  return (
    <>
      <Head>
        <title>Payment Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        searchKey="_id"
        title="Payment Reports"
        data_headers={data_headers}
        data_items={data}
      />
    </>
  )
}

export default Payment
