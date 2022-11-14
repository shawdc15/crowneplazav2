import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import { useRouter } from 'next/router'
import { RoleHeader, ModalLayout } from '../../components'
import { BackSvg } from '../../components/Svg'
import {
  checkHousekeeping,
  addCalendarData,
} from '../../services/calendar.services'
import { addLogs } from '../../services/logreport.services'
const RoomRecord = ({ role }) => {
  const router = useRouter()
  let id = router.query.id
  const [success, setSuccess] = useState()
  const mounted = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      if (id) {
        const newData = {
          roomNo: id.split('-')[1],
          roomName: id.split('-')[0],
          date: moment().format('YYYY-MM-DD'),
        }
        const res = await checkHousekeeping(newData)
        if (res.success) {
          setData(res.data[0])
          setIsLoading(false)
        } else {
          router.push('/404')
        }

        mounted.current = true
      }
    }

    if (!mounted.current) {
      setIsLoading(true)
      load()
    }
  })
  const backHandler = () => {
    router.back()
  }

  const data_headers = [
    'Tasks',
    'Done',
    'Broken',
    'Repaired',
    'Out of order',
    'Notes',
  ]
  const data_items = [
    'Clean Bedroom',
    'Clean Toilet',
    'Clean Windows',
    'Clean Fridge',
    'Clean Furnitures',
    'Clean Bathtub',
    'Sweep Floor',
    'Mop Floor',
    'Empty Trash',
    'Change Bedsheets',
    'Change Pillowcase',
    'Change Blanket',
    'Change Towels',
    'Change Trashbags',
    'Replace Toiletries',
    'Replace Rugs',
    'Others 1',
    'Others 2',
    'Others 3',
  ]

  const saveHandler = async (e) => {
    setSuccess(false)

    e.preventDefault()
    let temp = []
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (field.type == 'radio') {
        if (field.checked) {
          temp[field.name] = field.value
        }
      } else {
        temp[field.name] = field.value
      }
    })

    const newData = {}
    for (let d of data_items) {
      newData[toCamelCase(d)] = {
        taskStatus: temp[toCamelCase(d) + '-taskStatus'] || '',
        notes: temp[toCamelCase(d) + '-notes'],
      }
    }
    newData = {
      ...newData,
    }
    newData['cleaner'] = temp['cleaner']
    newData['roomNo'] = id.split('-')[1]
    newData['roomFloor'] = id.split('-')[1][0]
    newData['roomName'] = id.split('-')[0]
    newData['date'] = moment().format('YYYY-MM-DD')
    newData['roomStatus'] = temp['roomStatus']
    newData['reservationStatus'] = temp['reservationStatus']
    if (role == 'manager') {
      newData['verifiedBy'] = 'Manager'
    } else {
      newData['verifiedBy'] = 'Housekeeping Supervisor'
    }
    console.log(newData)
    const url = {
      roomNo: id.split('-')[1],
      roomName: id.split('-')[0],
    }
    const newLogs = {
      preferredRoom: url.roomNo,
      roomType: url.roomName,
      roomStatus: temp['roomStatus'],
      reservationStatus: temp['reservationStatus'],
      cleaner: temp['cleaner'],
      verifiedBy: newData['verifiedBy'],
    }
    const { success, data } = await addCalendarData(newData)
    if (success) {
      setData(data)
      setSuccess(true)
      await addLogs(newLogs)
    }
  }
  function toCamelCase(str) {
    const splitName = str.split(' ')
    const firstWord = splitName[0].toLowerCase()
    return firstWord + splitName[1]
  }
  return (
    <>
      <Head>
        <title>
          {role == 'manager' ? 'Manager' : 'Housekeeping'} Room | Crowné Plaza
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="room" role={role} />

      <div className="mx-auto w-full max-w-container overflow-auto p-4">
        <div className="mb-2 flex items-center">
          <button className="" onClick={backHandler}>
            <BackSvg />
          </button>
          <h1 className=" py-2 px-4 text-2xl text-slate-900">Room {id}</h1>
        </div>
        <form method="post" onSubmit={saveHandler}>
          {success && (
            <div className="flex items-center justify-between rounded-md bg-emerald-400 px-4 py-2 text-white">
              <p className=" ">Save Successfully!</p>
              <button className="underline" onClick={() => setSuccess(false)}>
                Close
              </button>
            </div>
          )}
          <table className="mt-4 w-full table-auto">
            <thead>
              <tr className="e bg-slate-800">
                {data_headers &&
                  data_headers.map((name, index) => (
                    <th className="p-3  text-center text-white" key={index}>
                      {name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data_items &&
                data_items.map((item, index) => (
                  <tr key={index} className="border ">
                    <td className=" border-slate-100 p-2 px-4 text-slate-600">
                      {item}
                    </td>
                    <td className="text-center">
                      <input
                        type="radio"
                        className="p-2"
                        defaultChecked={
                          data &&
                          data[`${toCamelCase(item)}`]?.taskStatus == 'done'
                        }
                        name={`${toCamelCase(item)}-taskStatus`}
                        value="done"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="radio"
                        className="p-2"
                        defaultChecked={
                          data &&
                          data[`${toCamelCase(item)}`]?.taskStatus == 'broken'
                        }
                        name={`${toCamelCase(item)}-taskStatus`}
                        value="broken"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="radio"
                        className="p-2"
                        defaultChecked={
                          data &&
                          data[`${toCamelCase(item)}`]?.taskStatus == 'repaired'
                        }
                        name={`${toCamelCase(item)}-taskStatus`}
                        value="repaired"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="radio"
                        className="p-2"
                        defaultChecked={
                          data &&
                          data[`${toCamelCase(item)}`]?.taskStatus ==
                            'outOfOrder'
                        }
                        name={`${toCamelCase(item)}-taskStatus`}
                        value="outOfOrder"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        className="p-1"
                        defaultValue={
                          (data && data[`${toCamelCase(item)}`]?.notes) || ''
                        }
                        name={`${toCamelCase(item)}-notes`}
                        placeholder="Type here"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="my-4 flex flex-col items-start justify-between gap-4 rounded-md border p-4 lg:flex-row">
            <div className="text-slate-700">
              <div className="flex items-center gap-4">
                <p className="text-lg">Cleaner: </p>
                {!isLoading && (
                  <select
                    defaultValue={data?.cleaner}
                    className="rounded-md border px-4 py-2"
                    name="cleaner"
                  >
                    <option value="Supplies">Supplies</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Technician">Technician</option>
                  </select>
                )}
              </div>
              <p className="text-lg">Verified By: {data?.verifiedBy}</p>
              <p className="text-lg">Date: {moment().format('MMM DD,YYYY')}</p>
            </div>
            {!isLoading && (
              <>
                <div className="text-slate-700">
                  <p>Reservation Status</p>
                  <select
                    defaultValue={data?.reservationStatus}
                    className="rounded-md border px-4 py-2"
                    name="reservationStatus"
                  >
                    <option value="Not Reserved">Not Reserved</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Checked-Out">Checked-Out</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
                <div className="text-slate-700">
                  <p>Room Status</p>
                  <select
                    defaultValue={data?.roomStatus}
                    className="rounded-md border px-4 py-2"
                    name="roomStatus"
                  >
                    <option value="Clean">Clean</option>
                    <option value="Dirty">Dirty</option>
                    <option value="Inspected">Inspected</option>
                    <option value="Out of Order">Out of Order</option>
                  </select>
                </div>
              </>
            )}
            <div className="flex gap-4">
              {data?._id && (
                <>
                  <a
                    className="rounded-md bg-slate-500 px-4 py-2 text-white"
                    href={`../../print/${data?._id}`}
                    target="_blank"
                  >
                    View Print
                  </a>
                </>
              )}
              <button className="rounded-md bg-emerald-500 px-4 py-2 text-white">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default RoomRecord
