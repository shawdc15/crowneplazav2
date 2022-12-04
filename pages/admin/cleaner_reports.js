import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { getLogs } from '../../services/logreport.services'
import Script from 'next/script'
const CleanerReports = () => {
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
      name: 'Cleaner',
      key: 'cleaner',
    },
    {
      name: 'Verified By',
      key: 'verifiedBy',
    },
    {
      name: 'Reservation Status',
      key: 'reservationStatus',
    },
    {
      name: 'Room Status',
      key: 'roomStatus',
    },
  ]
  return (
    <>
      <Head>
        <title>Cleaner Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

      <AdminMain
        searchKey="reservationStatus"
        title="Cleaner Reports"
        data_headers={data_headers}
        data_items={data}
      />
    </>
  )
}

export default CleanerReports
