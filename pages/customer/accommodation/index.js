import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AccommodationCard, Footer, Header, Loading } from '../../../components'
import { getActiveAccommodation } from '../../../services/accommodation.services'
import { useAppContext } from '../../../context/AppContext'
function Accommodation() {
  const { state, dispatch } = useAppContext()
  const { isLoading, accomodationList } = state
  useEffect(async () => {
    dispatch({ type: 'ACCOMODATION_REQUEST' })
    const res = await getActiveAccommodation()

    if (res.success) {
      setTimeout(() => {
        dispatch({ type: 'ACCOMODATION_SUCCESS', value: res.data })
      }, 500)
    } else {
      dispatch({ type: 'ACCOMODATION_ERROR' })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Accommodation | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="accomodation" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-auto mb-auto max-w-container ">
            {accomodationList.length > 0 ? (
              <div className="mx-2 my-2 mb-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accomodationList &&
                  accomodationList.map((data, index) => (
                    <AccommodationCard
                      data={data}
                      key={index}
                      role="customer"
                    />
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
        </>
      )}
      <Footer />
    </>
  )
}

export default Accommodation
