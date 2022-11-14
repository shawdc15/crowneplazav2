import React, { useEffect } from 'react'
import Head from 'next/head'
import { useAppContext } from '../../context/AppContext'
import { AdminMain, AdminSidebar } from '../../components'
import { getGuestList } from '../../services/user.services'
import { adminSearches } from '../../services/admin.services'

const Guests = () => {
  const { state, dispatch } = useAppContext()

  const data_headers = [
    {
      name: 'ID No#',
      key: '_id',
    },
    {
      name: 'Email',
      key: 'email',
    },
    {
      name: 'Username',
      key: 'username',
    },
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Contact',
      key: 'contact',
    },
  ]
  useEffect(async () => {
    dispatch({ type: 'CLEAR_SELECTED_DATA' })
    const { success, data } = await getGuestList()
    if (success) {
      dispatch({ type: 'SET_SELECTED_DATA', value: data })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Guests | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        title="Guests"
        searchKey="email"
        data_headers={data_headers}
        data_items={state.selectedData}
      />
    </>
  )
}

export default Guests
