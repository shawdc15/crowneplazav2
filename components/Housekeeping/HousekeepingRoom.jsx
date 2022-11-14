import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BackSvg } from '../Svg'
import { getOneActiveAccommodation } from '../../services/accommodation.services'
const HousekeepingRoom = ({ id }) => {
  const router = useRouter()

  const mounted = useRef()
  const [data, setData] = useState(null)
  const active = router.pathname.split('/')[1]
  useEffect(() => {
    const load = async () => {
      const { success, data } = await getOneActiveAccommodation(id)
      if (success) {
        setData(data)
      }
      if (id) {
        mounted.current = true
      }
    }
    if (!mounted.current) {
      load()
    }
  })
  return (
    <div className="mx-auto mb-auto w-full max-w-container">
      <div className="mb-2 flex items-center">
        <button onClick={() => router.back()}>
          <BackSvg />
        </button>
        <h1 className=" py-2 px-4 text-2xl text-slate-900">{data?.roomName}</h1>
      </div>
      <div className="mx-2 my-2 mb-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.roomNo.map((item, index) => (
            <div className="p-4" key={index}>
              <div className=" w-50 flex h-40 justify-center">
                <img
                  src={data?.image || '/thumbnail.png'}
                  alt={data?.roomName}
                  className="aspect-video w-full rounded-lg object-cover drop-shadow-md sm:w-72"
                />
              </div>
              <p className="py-2 pt-4 text-center text-xl">{item}</p>
              <p className="text-center">
                <Link
                  href={
                    active !== 'housekeeping'
                      ? `/manager/room/${data?.roomName}-${item}`
                      : `/housekeeping/room/${data?.roomName}-${item}`
                  }
                >
                  <button className="rounded-md bg-emerald-500 py-3 px-4 text-white transition-all duration-150 hover:rounded-lg">
                    View Room
                  </button>
                </Link>
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HousekeepingRoom
