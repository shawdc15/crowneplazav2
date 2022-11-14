import React from 'react'
import Link from 'next/link'
import { Footer, Sidebar } from '../../../components'
import {
  BookingDetailsSvg,
  CancellationSvg,
  ChangeBookingSvg,
  CovidSvg,
  SpecialRequestSvg,
  PopularQuestionSvg,
} from '../../../components/Svg'
import { Header } from '../../../components'
import Head from 'next/head'

const help = () => {
  return (
    <>
      <Head>
        <title>Settings | Help</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto mb-auto w-full max-w-container">
        <div className="mb-auto px-9">
          <h1 className="mb-4 py-4 text-xl text-slate-500 ">
            Settings /<span className="text-emerald-500"> Help</span>
          </h1>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="w-full py-4 lg:p-4">
              <ul className="grid grid-cols-1 md:grid-cols-2">
                <li>
                  <Link href="/customer/settings/help/popular_questions">
                    <p className="flex cursor-pointer gap-4 rounded-md px-4 py-5 text-slate-900 transition-colors hover:bg-emerald-400 hover:text-white">
                      <PopularQuestionSvg /> Popular Questions
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/settings/help/change_booking">
                    <p className="flex cursor-pointer gap-4 rounded-md px-4 py-5 text-slate-900 transition-colors hover:bg-emerald-400 hover:text-white">
                      <ChangeBookingSvg /> Change a Booking
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/settings/help/booking_details">
                    <p className="flex cursor-pointer gap-4 rounded-md px-4 py-5 text-slate-900 transition-colors hover:bg-emerald-400 hover:text-white">
                      <BookingDetailsSvg /> Booking Details
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/settings/help/special_requests">
                    <p className="flex cursor-pointer gap-4 rounded-md px-4 py-5 text-slate-900 transition-colors hover:bg-emerald-400 hover:text-white">
                      <SpecialRequestSvg /> Special Requests
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/settings/help/cancellation">
                    <p className="flex cursor-pointer gap-4 rounded-md px-4 py-5 text-slate-900 transition-colors hover:bg-emerald-400 hover:text-white">
                      <CancellationSvg /> Cancellation
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/settings/help/covid19">
                    <p className="flex cursor-pointer gap-4 rounded-md px-4 py-5 text-slate-900 transition-colors hover:bg-emerald-400 hover:text-white">
                      <CovidSvg /> COVID-19
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default help
