import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { paymentReports } from '../../services/receipt.services'
import Script from 'next/script'
import moment from 'moment'

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
      {/* <Script src="../../services/fileSaver.js" /> */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />
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
