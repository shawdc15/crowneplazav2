import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { cancellationReports } from '../../services/receipt.services'
import Script from 'next/script'

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
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const reasonChoices = data?.map(value => value.reason).filter(onlyUnique); 

  const roomTypeChoices = data?.map(value => value.roomType).filter(onlyUnique); 
  const [reason,setReason] = useState("")
  const [roomType,setRoomType] = useState("")

  const filteredButtons = [
    {
        key:"reason",
        setter:setReason,
        getter:reason,
        choices:reasonChoices
    },
    {
      key:"roomType",
      setter:setRoomType,
      getter:roomType,
      choices:roomTypeChoices
    }
  ]
  return (
    <>
      <Head>
        <title>Cancellation Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

      <AdminMain
        searchKey="_id"
        title="Cancellation Reports"
        data_headers={data_headers}
        data_items={data}
        filteredButtons={filteredButtons}
      />
    </>
  )
}

export default Cancellation
