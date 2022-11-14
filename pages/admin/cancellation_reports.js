import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { cancellationReports } from '../../services/receipt.services'

const Cancellation = () => {
  const [data, setData] = useState()
  useEffect(async () => {
    const { success, data } = await cancellationReports()
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
      name: 'Reason',
      key: 'reason',
    },
    {
      name: 'Date',
      key: 'created_at',
    },
  ]
  return (
    <>
      <Head>
        <title>Cancellation Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        searchKey="_id"
        title="Cancellation Reports"
        data_headers={data_headers}
        data_items={data}
      />
    </>
  )
}

export default Cancellation
