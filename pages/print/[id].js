import React, { useEffect, useRef, useState } from 'react'
import { getHousekeepingById } from '../../services/calendar.services'
import { useRouter } from 'next/router'
import moment from 'moment'
const Print = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState()
  const mounted = useRef()
  const router = useRouter()
  let id = router.query.id
  useEffect(() => {
    const load = async () => {
      if (id) {
        const res = await getHousekeepingById(id)
        if (res.success) {
          setData(res.data)
          console.log(res.data)
          setIsLoading(false)
        } else {
          console.log(res)
          // router.push('/404')
        }

        mounted.current = true
      }
    }

    if (!mounted.current) {
      setIsLoading(true)
      load()
    }
  })
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
  function toCamelCase(str) {
    const splitName = str.split(' ')
    const firstWord = splitName[0].toLowerCase()
    return firstWord + splitName[1]
  }
  return (
    <>
      {!isLoading && (
        <>
          <div className="flex items-center justify-between p-2">
            <div>
              <p>Room No: {data?.roomNo}</p>
              <p>Room Floor: {data?.roomFloor}</p>
              <p>Room Type: {data?.roomName}</p>
              <p>Room Status: {data?.roomStatus || 'Clean'}</p>
              <p>
                Reservation Status: {data?.reservationStatus || 'Not Reserved'}
              </p>
              <p>Verified By: {data?.verifiedBy}</p>
            </div>
            <button
              id="printbtn"
              className="rounded-md bg-slate-500 px-4 py-2 text-white"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>

          <table className="mt-4  min-w-min table-auto">
            <thead>
              <tr className="e bg-slate-800">
                {data_headers &&
                  data_headers.map((name, index) => (
                    <th
                      className="p-2  text-center text-xs text-white"
                      key={index}
                    >
                      {name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data_items &&
                data_items.map((item, index) => (
                  <tr key={index} className="border border-slate-200">
                    <td className="border  p-2 px-4 text-slate-600">{item}</td>
                    <td className="border text-center">
                      {data &&
                        data[`${toCamelCase(item)}`]?.taskStatus == 'done' && (
                          <p>&#10004;</p>
                        )}
                    </td>
                    <td className="border text-center">
                      {data &&
                        data[`${toCamelCase(item)}`]?.taskStatus ==
                          'broken' && <p>&#10004;</p>}
                    </td>
                    <td className="border text-center">
                      {data &&
                        data[`${toCamelCase(item)}`]?.taskStatus ==
                          'repaired' && <p>&#10004;</p>}
                    </td>
                    <td className="border text-center">
                      {data &&
                        data[`${toCamelCase(item)}`]?.taskStatus ==
                          'outOfOrder' && <p>&#10004;</p>}
                    </td>
                    <td className="border text-center">
                      <p>{data && data[`${toCamelCase(item)}`]?.notes}</p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default Print
