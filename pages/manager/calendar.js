import React from 'react'
import Head from 'next/head'
import { Calendar, RoleHeader } from '../../components'

const CalendarHousekeeping = () => {
  return (
    <>
      <Head>
        <title>Manager Calendar | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="calendar" role="manager" />
      <div className="mx-auto w-full max-w-container p-4">
        <Calendar />
      </div>
    </>
  )
}

export default CalendarHousekeeping
