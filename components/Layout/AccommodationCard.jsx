import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const AccommodationCard = ({ data, role }) => {
  const { roomName, details, price, _id } = data
  const formatTotal = (x) => {
    if (x != undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
  return (
    <div className="p-4">
      <Image
        // layout="fill"
        width={400}
        height={200}
        src={data?.image || '/thumbnail.png'}
        alt={data?.roomName}
        className="aspect-video h-56 rounded-lg object-cover drop-shadow-md"
      />
      <p className="pt-4 text-xl">{roomName}</p>
      <div className="flex justify-between">
        <p className="py-3">&#8369; {formatTotal(price)}</p>
        <Link
          href={` ${
            role == 'receptionists'
              ? '/receptionist/book/' + _id
              : '/customer/accommodation/' + _id
          }`}
        >
          <button className="bg-emerald-500 py-1 px-4 text-white transition-all duration-150 hover:rounded-lg">
            Book Now
          </button>
        </Link>
      </div>
      <p className="py-4 text-gray-700">{details}</p>
    </div>
  )
}

export default AccommodationCard
