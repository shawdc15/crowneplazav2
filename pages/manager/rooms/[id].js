import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getOneActiveAccommodation } from '../../../services/accommodation.services'
import { useRouter } from 'next/router'
import { HousekeepingRoom, RoleHeader } from '../../../components'
import { BackSvg } from '../../../components/Svg'
const Room = () => {
  const router = useRouter()
  let id = router.query.id

  return (
    <>
      <Head>
        <title>Manager Rooms | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="room" role="manager" />
      <HousekeepingRoom id={id} />
    </>
  )
}

export default Room
