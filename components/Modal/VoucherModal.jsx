import React, { useRef, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useAppContext } from '../../context/AppContext'
import { createVoucher, updateVoucher } from '../../services/voucher.services'
const VoucherModal = ({ setModal, mode }) => {
  const { state, dispatch } = useAppContext()
  const vouchercodeRef = useRef(state.adminModalData?.voucher_code)
  const descriptionRef = useRef()
  const statusRef = useRef()
  const discountRef = useRef()
  const discountTypeRef = useRef()

  const [error, setError] = useState()

  const submitHandler = async () => {
    const newData = {
      voucher_code:
        vouchercodeRef.current?.value == undefined
          ? vouchercodeRef.current
          : vouchercodeRef.current?.value,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      discount: discountRef.current.value,
      discount_type: discountTypeRef.current.value,
    }
    if (mode === 'add') {
      const res = await createVoucher(newData)
      if (res.success) {
        dispatch({
          type: 'SET_SELECTED_DATA',
          value: [...state.selectedData, res.data],
        })

        setModal(false)
      } else {
        setError(res.errors)
      }
    } else {
      const res = await updateVoucher(newData, state.adminModalData?._id)
      if (res.success) {
        const temp = state.selectedData
        for (let i = 0; i < temp.length; i++) {
          if (res.data._id == temp[i]._id) {
            temp[i] = res.data
          }
        }
        dispatch({
          type: 'SET_SELECTED_DATA',
          value: temp,
        })
        setModal(false)
      } else {
        setError(res.errors)
      }
    }
  }
  return (
    <ModalLayout>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">
          {mode == 'add' ? 'Create Voucher' : 'Update Voucher'}
        </p>
        <button
          onClick={() => setModal(false)}
          className="text-slate-400 transition-colors hover:text-slate-900"
        >
          Close
        </button>
      </div>
      <div className="flex flex-col">
        <span className="text-rose-500">{error?.voucherCodeError}</span>
        <label className="mt-2 text-slate-600">Voucher Code</label>
        {mode == 'add' ? (
          <input
            type="text"
            ref={vouchercodeRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="Voucher Code"
            defaultValue={state.adminModalData?.voucher_code}
          />
        ) : (
          <p className=" my-2 cursor-not-allowed rounded-md border border-slate-300 px-4 py-3 text-slate-600">
            {state.adminModalData?.voucher_code}
          </p>
        )}

        <span className="text-rose-500">{error?.descriptionError}</span>
        <label className="mt-2 text-slate-600">Description</label>
        <input
          type="text"
          ref={descriptionRef}
          className=" my-2 rounded-md border border-slate-300 px-4 py-3"
          placeholder="Description"
          defaultValue={state.adminModalData?.description}
        />

        <span className="text-rose-500">{error?.discountError}</span>
        <label className="mt-2 text-slate-600">Discount</label>
        <div className="flex gap-4">
          <input
            type="number"
            ref={discountRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="Discount"
            defaultValue={state.adminModalData?.discount}
          />
          <select
            ref={discountTypeRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            defaultValue={state.adminModalData?.discountTypeError}
          >
            <option value="Percent">Percent</option>
            <option value="Currency">Currency</option>
          </select>
        </div>

        <span className="text-rose-500">{error?.discountTypeError}</span>
        <label className="mt-2 text-slate-600">Status</label>
        <select
          ref={statusRef}
          className=" my-2 rounded-md border border-slate-300 px-4 py-3"
          defaultValue={state.adminModalData?.status}
        >
          <option value="Active">Active</option>
          <option value="Not Active">Not Active</option>
        </select>
      </div>
      <div className="my-4">
        <button
          onClick={submitHandler}
          className="w-full cursor-pointer rounded-md bg-emerald-500 py-2 text-white"
        >
          Submit
        </button>
      </div>
    </ModalLayout>
  )
}

export default VoucherModal
