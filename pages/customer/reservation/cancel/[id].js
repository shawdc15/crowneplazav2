import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
import {
  CancelReceiptModal,
  Footer,
  Header,
  PaymentLayout,
} from '../../../../components'
import {
  getOneReservation,
  updateStatus,
} from '../../../../services/reservation.services'
import { getPaymentById } from '../../../../services/payment.services'
import {
  postCancellationReceipt,
  sendReceipt,
} from '../../../../services/receipt.services'
const CancelReservation = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = router.query.id
  const [data, setData] = useState()
  const [modalData, setModalData] = useState()
  const [reason, setReason] = useState('Mistake in details')
  const mounted = useRef()
  useEffect(() => {
    const load = async () => {
      const { success, data } = await getPaymentById(id)
      if (success) {
        setData(data)
        console.log(data)
        if (data.status == 'request cancellation') {
          router.push('/customer/reservation')
        }
      }
    }
    if (!mounted.current) {
      load()
    }
    if (id) {
      mounted.current = true
    }
  })
  const reasonList = [
    {
      description: 'Family/Personal emergency',
      selected: false,
    },
    {
      description: 'Illness',
      selected: false,
    },
    {
      description: 'Travel Plans changed',
      selected: false,
    },
    {
      description: 'Bad weather/ Natural disaster',
      selected: false,
    },
    {
      description: 'I changed my mind',
      selected: false,
    },
    {
      description: 'Mistake in details',
      selected: true,
    },
  ]
  const submitHandler = async (receiptData) => {
    setIsLoading(true)
    const newData = {
      status: 'request cancellation',
      contact: receiptData.gcashNumber,
    }

    const update_res = await updateStatus(id, newData)
    console.log(update_res)

    if (update_res.success) {
      const res = await postCancellationReceipt({
        ...receiptData,
        receiptFor: data.name,
      })
      console.log(res)
      const result = await sendReceipt({
        ...receiptData,
        reference: res?.data._id,
        subject: 'cancellation',
        name: data?.name,
        email: data?.email,
      })
      if (result.success) {
        setModalData(res.data)
      }
    }
    setIsLoading(false)
  }
  return (
    <>
      <Head>
        <title>Reservation History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {modalData && (
        <CancelReceiptModal
          total={modalData?.total}
          channel={modalData?.channel}
          reference={modalData?._id}
          name={data?.name}
          status="pending"
        />
      )}
      <div className="mx-auto mb-auto w-full max-w-container px-9">
        <h1 className="mt-6 mb-4 text-2xl text-slate-900 lg:p-4">
          Cancel Reservation
        </h1>
        <div className="px-4">
          <div>
            <p className="py-2">Reason why will you cancel your reservation?</p>
            <div className="mb-4 grid grid-cols-1 p-2 lg:grid-cols-2">
              {reasonList.map(({ id, description, selected }, index) => (
                <div key={index} className="my-2 flex items-center gap-2">
                  <input
                    onClick={(e) => setReason(description)}
                    id={id}
                    type="radio"
                    name="reason"
                    defaultChecked={selected}
                  />
                  <label htmlFor={id}>{description}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <p className="">Mode of Money Transfer for Refund</p>
            <p className="text-slate-500">
              Note: 5% of your total balance will be deducted. This will serve
              as the transaction fee for the company. The money will be
              transferred manually and will not be automatically refunded.
              Please wait for at least 3 minutes to transfer your money back. An
              email will be sent to registered email address to notify you that
              the refund is already success.
            </p>
          </div>
          {/* mode of payment  */}
          <PaymentLayout
            mode="cancellation"
            action={submitHandler}
            metaData={{
              roomType: data?.roomType,
              preferredRoom: data?.preferredRoom,
            }}
            reason={reason}
            total={data?.total}
            id={data?._id}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CancelReservation
