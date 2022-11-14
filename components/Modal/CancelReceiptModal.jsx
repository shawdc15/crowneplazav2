import React from 'react'
import ModalLayout from '../Layout/ModalLayout'
import Link from 'next/link'

const CancelReceiptModal = ({ total, channel, reference, name }) => {
  return (
    <ModalLayout>
      <div>
        <div>
          <p className="my-2 text-center text-xl">Cancellation Receipt</p>
          <div className="my-4 flex items-center justify-center text-white">
            <div className="bg-slate-900 p-4 ">
              <p className="">Total Due</p>
              <p>Php {total}</p>
              <p className="capitalize">Status: Pending</p>
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
            We have already received your request for cancellation for your
            reservation on our hotel. Please do note that we will deduct 5% of
            your total payment for convenience and transaction fee.
            <br />
            For now, please wait for a time to process your refund. You will be
            notified once it is done.
            <br />
            Thank you, Hope we will see you again! We are always pleased to
            welcome you.
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

export default CancelReceiptModal
