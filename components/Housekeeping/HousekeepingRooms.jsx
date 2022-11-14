import Link from 'next/link'
import React from 'react'
import Loading from '../Customized/Loading'
import Image from 'next/image'
const HousekeepingRooms = ({ isLoading, list, active }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto mb-auto w-full max-w-container">
          {list.length > 0 ? (
            <div className="mx-2 my-2 mb-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list &&
                list.map(({ roomName, image, _id }, index) => (
                  <div className="p-4" key={index}>
                    <div className=" w-50 flex h-40 justify-center">
                      <Image
                        height={250}
                        width={400}
                        src={image || '/thumbnail.png'}
                        alt={roomName}
                        className="aspect-video w-full rounded-lg object-cover drop-shadow-md sm:w-72"
                      />
                    </div>
                    <p className="py-2 pt-4 text-center text-xl">{roomName}</p>
                    <p className="text-center">
                      <Link
                        href={
                          active !== 'housekeeping'
                            ? `/manager/rooms/${_id}`
                            : `/housekeeping/rooms/${_id}`
                        }
                      >
                        <button className="rounded-md bg-emerald-500 py-3 px-4 text-white transition-all duration-150 hover:rounded-lg">
                          View Rooms
                        </button>
                      </Link>
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="mb-auto  flex min-h-card items-center justify-center">
              <p className="w-full text-center text-xl ">
                Sorry but there is no available room for now! Please try again
                later.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default HousekeepingRooms
