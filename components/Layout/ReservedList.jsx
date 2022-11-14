import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import {
  getReservationByStatus,
  getAllReserved,
} from '../../services/reservation.services'
import { ReservedCardModal, RoleHeader } from '../../components'
import moment from 'moment'
const ReservedList = ({ role, status, reserved }) => {
  const [data, setData] = useState()
  const selectedData = useRef()
  const [modal, setModal] = useState(false)
  const [filter, setFilter] = useState('name')
  const [searchValue, setSearchValue] = useState('')
  const mounted = useRef()
  useEffect(() => {
    const load = async () => {
      if (reserved) {
        const { success, data } = await getAllReserved()
        if (success) {
          setData(data)
        }
      } else {
        const { success, data } = await getReservationByStatus(status)
        if (success) {
          setData(data)
        }
      }

      mounted.current = true
    }
    if (!mounted.current) {
      load()
    }
  })

  const searchResult = data?.filter((d) =>
    d[filter]
      ?.toString()
      .toLowerCase()
      .includes(searchValue.toString().toLowerCase())
  )
  return (
    <>
      <Head>
        <title>Reserved List | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active={status} role={role} />
      <div className="mx-auto w-full max-w-container p-4 ">
        <div className="flex">
          <input
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
          <select
            className="my-2 px-4 py-3 "
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="preferredRoom">Room No</option>
          </select>
        </div>
        <p className="mt-10 p-2 text-lg font-semibold">
          Record: {searchResult?.length || 0}
        </p>

        <div className="mt-5 grid  grid-cols-1 gap-6 lg:grid-cols-2">
          {searchResult &&
            searchResult.map(
              (
                {
                  name,
                  roomType,
                  checkIn,
                  checkOut,
                  preferredRoom,
                  image,
                  roomName,
                  _id,
                },
                index
              ) => (
                <div key={index} className="flex flex-col gap-4 lg:flex-row">
                  <img
                    src={image || '/thumbnail.png'}
                    alt={roomName}
                    className="w-50 aspect-video  rounded-lg object-cover drop-shadow-md lg:h-40"
                  />
                  <div>
                    <p className="pt-1">{roomType}</p>
                    <p className="pt-1">{name}</p>
                    <div>
                      <p className="pb-1 text-slate-500">
                        Check-in: {moment(checkIn).format('MMM DD, YYYY')}
                      </p>
                      <p className="pb-1 text-slate-500">
                        Check-out: {moment(checkOut).format('MMM DD, YYYY')}
                      </p>
                    </div>
                    <p className="pb-1">Room {preferredRoom}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          selectedData.current = _id
                          setModal(!modal)
                        }}
                        className="w-full rounded-md bg-slate-200 px-4 py-2 "
                      >
                        View
                      </button>
                      {data?.status == 'checkedIn' && (
                        <button className="rounded-md bg-emerald-500 px-4 py-2 text-white">
                          Check-out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      {modal ? (
        <ReservedCardModal
          data={data}
          setData={setData}
          id={selectedData.current}
          setModal={setModal}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ReservedList
