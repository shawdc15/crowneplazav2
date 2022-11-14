import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import { ConfirmReceiptModal, Footer, Header } from '../../../components'
import { getPaymentById } from '../../../services/payment.services'
import { useRouter } from 'next/router'
import { updateStatus } from '../../../services/reservation.services'
import {
  postConfirmationReceipt,
  sendReceipt,
} from '../../../services/receipt.services'
import moment from 'moment'
import Link from 'next/link'
import { PayPalButton } from 'react-paypal-button-v2'
import Image from 'next/image'

const Payment = () => {
  // paypal loaded
  const [loaded, setLoaded] = useState(false)
  const referenceRef = useRef()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = router.query.id
  const [timer, setTimer] = useState({ active: false, value: 0 })

  const [modalData, setModalData] = useState()
  const [data, setData] = useState()
  const [expired, setExpired] = useState(false)
  const mounted = useRef()
  useEffect(() => {
    if (timer?.active) {
      setTimeout(async () => {
        if (timer.value > 0) {
          // console.log(timer.value)
          setTimer({ active: true, value: Math.round(timer.value - 1) })
        } else {
          setExpired(true)
          setTimer({ active: false, value: 0 })
        }
      }, 1000)
    }
    const load = async () => {
      const res = await getPaymentById(id)
      if (res.success) {
        if (res.data == null) {
          router.push('/')
          return
        }
        console.log(res.data)
        setTimer({
          active: true,
          value: Math.round(timerHandler(res.data?.end_expiration)),
        })
        if (res.data?.status == 'reserved') {
          router.push('/customer/reservation')
          return
        }
        console.log(res.data)
        declinedHandler(res.data.end_expiration)
        setTimeout(() => {
          setData(res.data)
        }, 2000)

        if (window.paypal) {
          setLoaded(true)
          return
        }
        const script = document.createElement('script')
        const url =
          'https://www.paypal.com/sdk/js?client-id=AbvvE0-jCAzqcej9uWf_9-7hmsFbiAW10yYfwjTSbIa4Ct5bJnlOu_82lJll6murAvH-FXzvlCeY53Nt&locale=en_US&currency=PHP&disable-funding=credit,card'
        script.src = url
        script.type = 'text/javascript'
        script.async = true
        script.onload = () => setLoaded(true)
        document.body.appendChild(script)
      }
    }
    if (!mounted.current) {
      load()
    }
    if (id) {
      mounted.current = true
    }
  }, [timer, id])
  const declinedHandler = async (newDate, quit) => {
    if (
      moment(newDate).clone().format('YYYY-MM-DD HH:mm') <
      moment().clone().format('YYYY-MM-DD HH:mm')
    ) {
      await updateStatus(id, { status: "Cancelled (Didn't Pay)" })
      setExpired(true)
      if (quit) {
        return
      }
    }
  }
  const formatBySecond = (date) => {
    let data = new Date(date)
    return data.getTime() / 1000
  }
  const timerHandler = (expiredDate) => {
    const timestamp = formatBySecond(expiredDate)
    let currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')

    const diff = formatBySecond(currentDateTime) - timestamp

    return diff * -1
  }
  const paymentHandler = async (receiptData) => {
    declinedHandler(data.end_expiration, true)

    setIsLoading(true)
    const newData = {
      status: 'reserved',
    }

    const update_res = await updateStatus(id, newData)
    if (update_res.success) {
      const res = await postConfirmationReceipt(receiptData)
      console.log(res)
      const result = await sendReceipt({
        ...receiptData,
        subject: 'confirmation',
        name: data?.name,
        email: data?.email,
      })
      if (res.success) {
        setModalData(res.data)
      } else {
        console.log(res)
        setIsLoading(false)
      }
    }
  }
  const formatTotal = (x) => {
    if (x != undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
  return (
    <>
      {modalData && (
        <ConfirmReceiptModal
          total={modalData?.total}
          channel={modalData?.channel}
          reference={referenceRef.current?.value}
          name={modalData?.cardHolderName}
          status="pending"
        />
      )}
      <Head>
        <title>Payment </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="" />
      <div className="mx-auto mb-auto w-full  max-w-container">
        {data &&
          (!expired ? (
            <div className="mb-auto px-9">
              <h1 className="mb-2 p-4 text-2xl text-slate-900">
                Payment for Reservation
              </h1>
              <p>
                {'Remaining Time: [ ' +
                  parseInt(timer?.value / 60) +
                  ' : ' +
                  (timer.value % 60 > 9
                    ? Math.round(timer.value % 60)
                    : '0' + Math.round(timer.value % 60)) +
                  ' ]'}
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div>
                  <Image
                    height={250}
                    width={400}
                    src={data?.image || '/thumbnail.png'}
                    alt={data?.roomType}
                    className="aspect-video w-full rounded-lg object-cover drop-shadow-md sm:w-72"
                  />
                </div>
                <div className="py-4 md:p-4">
                  <div>
                    <p className="my-2 flex flex-col items-center text-xl sm:flex-row">
                      {data?.roomType}
                      <span className="my-2 ml-2 rounded-md bg-emerald-400 px-2 py-1 text-lg text-white">
                        Room No: {data?.preferredRoom}
                      </span>
                    </p>

                    <p>
                      1 room,{' '}
                      {`${
                        parseInt(data?.noOfChildren) + parseInt(data?.noOfAdult)
                      } people `}
                      ,
                      {data?.noOfExtraBed > 0
                        ? `${data?.noOfExtraBed} extra bed`
                        : 'no extra bed'}
                    </p>
                    <p className="my-2">
                      Check In: {moment(data?.checkIn).format('MMM DD YYYY')}
                    </p>
                    <p className="my-2">
                      Check Out: {moment(data?.checkOut).format('MMM DD YYYY')}
                    </p>
                    <p className="my-3 text-lg text-slate-900">
                      Total: &#8369; {formatTotal(data?.total)}
                    </p>
                    <p className=" my-3 text-lg font-semibold text-slate-900">
                      Downpayment Total: &#8369; {formatTotal(data?.total / 2)}
                    </p>
                  </div>
                </div>
              </div>
              {loaded ? (
                <div className="relative z-0">
                  {!isLoading && (
                    <PayPalButton
                      amount={data?.total / 2}
                      currency="PHP"
                      shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      onSuccess={(details, { paymentSource, orderID }) => {
                        const newData = {
                          reference: orderID,
                          preferredRoom: data?.preferredRoom,
                          reservation_id: data?._id,
                          channel: paymentSource,
                          roomType: data?.roomType,
                          receiptFor:
                            details.payer.name.given_name +
                            ' ' +
                            details.payer.name.surname,
                          total: details.purchase_units[0].amount.value,
                          status: 'paid',
                        }
                        referenceRef.current = orderID
                        paymentHandler(newData)
                        console.log(details)
                        // OPTIONAL: Call your server to save the transaction
                      }}
                    />
                  )}
                </div>
              ) : (
                <span>loading</span>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="mt-10 text-center text-2xl font-semibold">
                Payment for this reservation is automatically cancelled, because
                you did not make a payment on a given time.
              </p>
              <Link href="/customer/reservation">
                <button className="mt-4 rounded-lg bg-emerald-500 p-4 py-2 text-white">
                  Back to Reservation History
                </button>
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </>
  )
}

export default Payment
