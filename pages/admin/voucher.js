import React, { useEffect } from 'react'
import Head from 'next/head'
import { useAppContext } from '../../context/AppContext'
import { AdminMain, AdminSidebar, VoucherModal } from '../../components'
import { getAllVoucher } from '../../services/voucher.services'

const Voucher = () => {
  const { state, dispatch } = useAppContext()

  const data_headers = [
    {
      name: 'Voucher Code',
      key: 'voucher_code',
    },
    {
      name: 'Description',
      key: 'description',
    },
    {
      name: 'Discount',
      key: 'discount',
    },
    {
      name: 'Discount Type',
      key: 'discount_type',
    },
    {
      name: 'Status',
      key: 'status',
    },
  ]
  useEffect(async () => {
    dispatch({ type: 'CLEAR_SELECTED_DATA', value: data })
    const { success, data } = await getAllVoucher()
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
        searchKey="voucher_code"
        title="Voucher"
        data_headers={data_headers}
        data_items={state.selectedData}
      />
    </>
  )
}

export default Voucher
