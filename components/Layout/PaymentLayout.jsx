import React, { useState, useRef } from 'react'
const PaymentLayout = ({
  mode,
  action,
  reason,
  total,
  id,
  isLoading,
  metaData,
}) => {
  const [error, setError] = useState(null)
  const [method, setMethod] = useState('Paypal')

  const paymentHandler = async () => {
    let temp_error = null
    if (phoneNumberRef.current.value.length != 11) {
      temp_error = ['Please provide the correct number and must be 10 digits']
    }
    const newData = {
      gcashNumber: phoneNumberRef.current.value.trim(),
      ...metaData,
      channel: method,
      status: mode == 'confirmation' ? 'paid' : 'pending',
      reason,
      total:
        mode == 'confirmation' ? total / 2 : total / 2 - (total / 2) * 0.05,
      reservation_id: id,
    }
    console.log(newData)
    if (temp_error == null) {
      action(newData)
    }
    setError(temp_error)
  }
  const phoneNumberRef = useRef()

  const gcash = () => {
    return (
      <>
        <div className="relative flex items-center ">
          <span className="absolute left-4">+63</span>
          <input
            id="fix"
            ref={contactRef}
            type="number"
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 pl-12 lg:ml-2"
            placeholder="Phone Number"
          />
        </div>
        {actionsBtn()}
      </>
    )
  }
  const actionsBtn = () => {
    return (
      <>
        {mode == 'confirmation' ? (
          isLoading ? (
            <button className=" my-2 w-full rounded-md bg-gray-900 p-3 text-slate-100 disabled:bg-slate-600">
              ...
            </button>
          ) : (
            <button
              onClick={paymentHandler}
              className=" my-2 w-full rounded-md bg-gray-900 p-3 text-slate-100 disabled:bg-slate-600"
            >
              Confirm Payment
            </button>
          )
        ) : isLoading ? (
          <button className=" my-2 w-full rounded-md bg-gray-900 p-3 text-slate-100 disabled:bg-slate-600">
            ...
          </button>
        ) : (
          <button
            onClick={paymentHandler}
            className=" my-2 w-full rounded-md bg-gray-900 p-3 text-slate-100 disabled:bg-slate-600"
          >
            Refund Payment
          </button>
        )}
      </>
    )
  }

  return (
    <div>
      {error && error.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-md bg-rose-500 p-4 text-white transition-all delay-75">
          <p>{error[0]}</p>
          <span
            onClick={() => setError(false)}
            className="cursor-pointer text-white underline"
          >
            Close
          </span>
        </div>
      )}
      <div>
        <div className="flex items-center gap-4 p-4 ">
          <img
            onClick={() => {
              setMethod('Paypal')
            }}
            src={'/paypal.png'}
            className={`aspect-video h-24 rounded-md border-2 border-emerald-500`}
          />
        </div>
        <div className="px-4">{gcash()}</div>
      </div>
    </div>
  )
}

export default PaymentLayout
