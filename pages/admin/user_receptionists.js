import React, { useEffect } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { useAppContext } from '../../context/AppContext'
import { getAllStaff } from '../../services/staff.services'

const UserReceptionist = () => {
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
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Contact',
      key: 'contact',
    },
    {
      name: 'Shift',
      key: 'shift',
    },
  ]
  useEffect(async () => {
    dispatch({ type: 'CLEAR_SELECTED_DATA' })
    const { success, data } = await getAllStaff('receptionists')
    if (success) {
      dispatch({ type: 'SET_SELECTED_DATA', value: data })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Receptionists | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        title="Receptionists"
        data_headers={data_headers}
        data_items={state.selectedData}
      />
    </>
  )
}

export default UserReceptionist
