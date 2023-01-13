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
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  const roomStatusChoices = data?.map(value => value.roomStatus).filter(onlyUnique); 
  const reservationStatusChoices = data?.map(value => value.reservationStatus).filter(onlyUnique); 
  const cleanerChoices = data?.map(value => value.cleaner).filter(onlyUnique); 
  
  const [cleaner, setCleaner] = useState("")
  const [reservationStatus, setReservationStatus] = useState("")
  const [roomStatus, setRoomStatus] = useState("")

  const filteredButtons = [
    {
        key:"cleaner",
        setter:setCleaner,
        getter:cleaner,
        choices:cleanerChoices
    },
    {
        key:"reservationStatus",
        setter:setReservationStatus,
        getter:reservationStatus,
        choices:reservationStatusChoices
    },
    {
        key:"roomStatus",
        setter:setRoomStatus,
        getter:roomStatus,
        choices:roomStatusChoices
    }
  ]
  return (
    <>
      <Head>
        <title>Cleaner Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

      <AdminMain
        searchKey="_id"
        title="Cleaner Reports"
        data_headers={data_headers}
        data_items={data}
        filteredButtons={filteredButtons}
      />
    </>
  )
}

export default CleanerReports
