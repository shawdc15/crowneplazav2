import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { getLogs } from '../../services/logreport.services'
import Script from 'next/script'

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
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  const roomTypeChoices = data?.map(value => value.roomType).filter(onlyUnique); 
  const reservationStatusChoices = data?.map(value => value.reservationStatus).filter(onlyUnique); 
  const roomStatusChoices = data?.map(value => value.roomStatus).filter(onlyUnique); 
  console.log(roomTypeChoices,reservationStatusChoices,roomStatusChoices)
  const [roomType, setRoomType] = useState("")
  const [reservationStatus, setReservationStatus] = useState("")
  const [roomStatus, setRoomStatus] = useState("")

  const filteredButtons = [
    {
        key:"roomType",
        setter:setRoomType,
        getter:roomType,
        choices:roomTypeChoices
    },
    {
        key:"roomStatus",
        setter:setRoomStatus,
        getter:roomStatus,
        choices:roomStatusChoices
    },
  ]
  console.log(data)
  return (
    <>
      <Head>
        <title>Room Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

      <AdminMain
        searchKey="preferredRoom"
        title="Room Reports"
        data_headers={data_headers}
        data_items={data}
        filteredButtons={filteredButtons}
      />
    </>
  )
}

export default RoomReports
