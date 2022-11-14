import React, { useState, useEffect, useRef } from 'react'
import { RoleHeader, ModalLayout } from '../../components'
import Head from 'next/head'
import moment from 'moment'
import {
  getCalendarDataByDate,
  addCalendarData,
} from '../../services/calendar.services'
import { addLogs } from '../../services/logreport.services'
const HouseKeeping = ({ role }) => {
  const [data, setData] = useState()
  const roomStatusRef = useRef()
  const reservationStatusRef = useRef()

  const [isLoading, setIsLoading] = useState(false)
  useEffect(async () => {
    const { success, data } = await getCalendarDataByDate({
      date: moment().format('YYYY-MM-DD'),
    })
    if (success) {
      setData(data)
    }
  }, [])

  const data_headers = [
    { name: 'Room No.', key: 'roomNo' },
    { name: 'Room Type', key: 'roomName' },
    { name: 'Room Floor', key: 'roomFloor' },
    { name: 'Room Status', key: 'roomStatus' },
    { name: 'Reservation Status', key: 'reservationStatus' },
  ]
  if (role == 'receptionist') {
    data_headers.splice(3, 1)
  }

  const changeHandler = async (item) => {
    setIsLoading(true)
    const newData = {
      roomName: item.roomName,
      roomNo: item.roomNo,
      date: item.date,
      roomStatus: roomStatusRef.current?.value || data?.roomStatus,
      reservationStatus: reservationStatusRef.current.value,
    }
    const { success } = await addCalendarData(newData)
    if (success) {
      const newLogs = {
        preferredRoom: item.roomNo,
        roomType: item.roomName,
        roomStatus: roomStatusRef.current?.value || data?.roomStatus,
        reservationStatus: reservationStatusRef.current.value,
        cleaner: item.cleaner,
        verifiedBy: 'John Doe',
      }
      await addLogs(newLogs)
      const res_date = await getCalendarDataByDate({
        date: moment().format('YYYY-MM-DD'),
      })
      if (res_date.success) {
        setData(res_date.data)
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Manager Housekeeping | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {role == 'receptionist' ? (
        <RoleHeader active="reservation" role={role} />
      ) : (
        <RoleHeader active="housekeepings" role={role} />
      )}
      {isLoading && (
        <ModalLayout>Please wait table is now updating...</ModalLayout>
      )}
      <div className="mx-auto w-full max-w-container p-4">
        <table className="mt-4 w-full table-auto">
          <thead>
            <tr className=" bg-slate-800">
              {data_headers &&
                data_headers.map(({ name }, index) => (
                  <th className="p-3 text-center text-white" key={index}>
                    {name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {data_headers &&
                    data_headers.map(({ key }, sub_index) => (
                      <td
                        className={`border-2 border-slate-100  text-center text-slate-600 ${
                          key == 'roomStatus' && item[key] == 'Clean'
                            ? 'bg-cyan-400'
                            : key == 'roomStatus' && item[key] == 'Dirty'
                            ? 'bg-rose-400'
                            : key == 'roomStatus' && item[key] == 'Out of Order'
                            ? 'bg-slate-400'
                            : key == 'roomStatus' && item[key] == 'Inspected'
                            ? 'bg-emerald-400'
                            : key == 'reservationStatus' &&
                              item[key] == 'Reserved'
                            ? 'bg-orange-400'
                            : key == 'reservationStatus' &&
                              item[key] == 'Checked-Out'
                            ? 'bg-yellow-400'
                            : key == 'reservationStatus' &&
                              item[key] == 'Not Available' &&
                              'bg-violet-400'
                        }`}
                        key={sub_index}
                      >
                        {key == 'roomStatus' ? (
                          <select
                            className="bg-transparent p-4"
                            defaultValue={item[key]}
                            onChange={() => changeHandler(item)}
                            ref={roomStatusRef}
                          >
                            <option value="Clean">Clean</option>
                            <option value="Dirty">Dirty</option>
                            <option value="Out of Order">Out of Order</option>
                            <option value="Inspected">Inspected</option>
                          </select>
                        ) : key == 'reservationStatus' ? (
                          <select
                            className="bg-transparent p-4"
                            defaultValue={item[key]}
                            onChange={() => changeHandler(item)}
                            ref={reservationStatusRef}
                          >
                            <option value="Not Reserved">Not Reserved</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Checked-Out">Checked-Out</option>
                            <option value="Not Available">Not Available</option>
                          </select>
                        ) : (
                          item[key]
                        )}
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={data_headers.length}
                  className="bg-slate-100 p-2 text-center"
                >
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default HouseKeeping
