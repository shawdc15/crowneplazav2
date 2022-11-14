import React from 'react'
import Head from 'next/head'
import { Calendar, RoleHeader } from '../../components'

const CalendarHousekeeping = () => {
  return (
    <>
      <Head>
        <title>Housekeeping Calendar | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="calendar" role="housekeeping" />
      <div className="mx-auto w-full max-w-container p-4">
        <Calendar />
      </div>
    </>
  )
}

export default CalendarHousekeeping
