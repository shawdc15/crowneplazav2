import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Footer, Header, Loading } from '../../../components'
import { useAppContext } from '../../../context/AppContext'
import { getCustomerReservation } from '../../../services/reservation.services'
import moment from 'moment'
const History = () => {
  const { state, dispatch } = useAppContext()
  const { isLoading, reservationList, access_id } = state
  useEffect(async () => {
    dispatch({ type: 'RESERVATION_HISTORY_REQUEST' })
    if (access_id) {
      const res = await getCustomerReservation(access_id)
      if (res.success) {
        setTimeout(() => {
          dispatch({ type: 'RESERVATION_HISTORY_SUCCESS', value: res.data })
        }, 500)
      }
    } else {
      dispatch({ type: 'RESERVATION_HISTORY_ERROR' })
    }
  }, [access_id])
  const formatTotal = (x) => {
    if (x != undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }

  return (
    <>
      <Head>
        <title>Reservation History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="reservation" />
      <div className="mx-auto mb-auto w-full  max-w-container">
        <div className="mb-auto px-9">
          <h1 className="mt-6 p-4 text-2xl text-slate-900">
            Reservation History
          </h1>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col justify-center gap-4 p-4  lg:flex-row">
              <>
                {reservationList?.length == 0 ? (
                  <div className="w-full p-4">
                    <p className="text-center">No History</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {reservationList?.map(
                      (
                        {
                          _id,
                          checkIn,
                          checkOut,
                          noOfExtraBed,
                          noOfChildren,
                          noOfAdult,
                          status,
                          image,
                          roomType,
                          total,
                          preferredRoom,
                          requestComment,
                        },
                        index
                      ) => (
                        <div
                          key={index}
                          className="flex flex-col md:gap-4 lg:flex-row lg:items-center"
                        >
                          <div className="flex w-screen max-w-md items-center justify-center">
                            <Image
                              height={250}
                              width={400}
                              src={image || '/thumbnail.png'}
                              alt={roomType}
                              className="aspect-video rounded-lg object-cover drop-shadow-md sm:w-72"
                            />
                          </div>
                          <div className="py-4 md:p-4">
                            <div>
                              <p className="my-2 flex flex-col items-center text-xl sm:flex-row">
                                {roomType}
                                <span className="my-2 ml-2 rounded-md bg-emerald-400 px-2 py-1 text-lg text-white">
                                  Room No: {preferredRoom}
                                </span>
                              </p>

                              <p>
                                1 room,{' '}
                                {`${
                                  parseInt(noOfChildren) + parseInt(noOfAdult)
                                } people `}
                                ,
                                {noOfExtraBed > 0
                                  ? `${noOfExtraBed} extra bed`
                                  : 'no extra bed'}
                              </p>
                              <p className="my-2">
                                Check In:{' '}
                                {moment(checkIn).format('MMM DD YYYY')}
                              </p>
                              <p className="my-2">
                                Check Out:{' '}
                                {moment(checkOut).format('MMM DD YYYY')}
                              </p>
                              <p className="my-3 text-lg text-slate-900">
                                Total: &#8369; {formatTotal(total)}
                              </p>
                              <p className=" my-3 text-lg font-semibold text-slate-900">
                                Downpayment Total: &#8369;{' '}
                                {formatTotal(total / 2)}
                              </p>
                            </div>
                            <div className="flex gap-4">
                              {status == 'reserved' ? (
                                <>
                                  <p
                                    className="
                              my-2 
                            rounded-md bg-slate-200 px-4 py-2 capitalize text-slate-900  disabled:bg-slate-600"
                                  >
                                    Status: Paid and Reserved
                                  </p>
                                  <Link
                                    href={`/customer/reservation/cancel/${_id}`}
                                  >
                                    <button
                                      className="
                             my-2 rounded-md
                           bg-emerald-500 px-4 py-2 capitalize text-white  disabled:bg-slate-600"
                                    >
                                      Cancel Booking
                                    </button>
                                  </Link>
                                </>
                              ) : status == 'approved' ? (
                                <>
                                  <p
                                    className="
                              my-2 cursor-default
                              rounded-md bg-slate-200
                           px-4 py-2 text-center capitalize text-slate-900  disabled:bg-slate-600"
                                  >
                                    Status: {status}
                                  </p>
                                  <Link href={`/customer/payment/${_id}`}>
                                    <button
                                      className="
                             my-2 rounded-md
                           bg-emerald-500 px-4 py-2 capitalize text-white  disabled:bg-slate-600"
                                    >
                                      Make a payment
                                    </button>
                                  </Link>
                                </>
                              ) : status === 'approve_cancellation' ? (
                                <>
                                  <p
                                    className="
                              my-2 cursor-default
                              rounded-md bg-slate-200
                           px-4 py-2 text-center capitalize text-slate-900  disabled:bg-slate-600"
                                  >
                                    Status: Approved Cancellation
                                  </p>
                                </>
                              ) : (
                                <button
                                  className="
                              my-2 cursor-default
                              rounded-md bg-slate-200
                           px-4 py-2 text-center capitalize text-slate-900  disabled:bg-slate-600"
                                >
                                  Status: {status}
                                </button>
                              )}
                            </div>
                            {status == 'declined' && requestComment && (
                              <p className="w-full max-w-md border-2 border-dashed border-rose-500 bg-rose-100 p-2 px-4">
                                {requestComment}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    )}
                    <div></div>
                    <p></p>
                  </div>
                )}
              </>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default History
