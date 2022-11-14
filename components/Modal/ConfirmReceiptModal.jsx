import React from 'react'
import ModalLayout from '../Layout/ModalLayout'
import Link from 'next/link'
const ConfirmReceiptModal = ({ total, channel, reference, name }) => {
  return (
    <ModalLayout>
      <div>
        <div>
          <p className="my-2 text-center text-xl">Confirmation Receipt</p>
          <div className="my-4 flex items-center justify-center text-white">
            <div className="bg-slate-900 p-4 ">
              <p>Total Due</p>
              <p>Php {total}</p>
              <p className="capitalize">Status: Paid</p>
            </div>
          </div>
        </div>
        <div>
          <p>Channel: {channel}</p>
          <p>Reference No: {reference}</p>
        </div>
        <div className="my-4">
          <p>Hello {name},</p>
          <p className="leading-8">
            We have already received your payment in our channel and your room
            is already reserved. Please be mindful with our health protocols.
            Please do not forget to bring your vaccination cards as we will
            check it again once you are already in our hotel
            <br />
            Your 50% balance should be paid upon checking-in in our hotel.
            Please coordinate with our Hotel Receptionist to confirm ypur
            identity and reservation.
            <br />
            Thank you and enjoy your stay!
          </p>
        </div>
        <Link href="/customer/reservation">
          <p className="flex justify-center">
            <button className="rounded-md bg-slate-900 px-4 py-3 text-white">
              Close
            </button>
          </p>
        </Link>
      </div>
    </ModalLayout>
  )
}

export default ConfirmReceiptModal
