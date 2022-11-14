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
    const newData = null
    if (method == 'Paypal') {
      newData = {
        receiptFor: gcashFullnameRef.current.value.trim(),
        gcashNumber: phoneNumberRef.current.value.trim(),
      }
      if (newData.receiptFor.length == 0 || newData.gcashNumber.length == 0) {
        temp_error = ['Please fill up the form']
      }
    } else {
      newData = {
        receiptFor: visaFullnameRef.current.value.trim(),
        creditCardNumber: cardNumberRef.current.value.trim(),
        expiryDate: expiryDateRef.current.value.trim(),
        cvv: cvvRef.current.value.trim(),
      }
      if (
        newData.receiptFor.length == 0 ||
        newData.creditCardNumber.length == 0 ||
        newData.expiryDate.length == 0 ||
        newData.cvv.length == 0
      ) {
        temp_error = ['Please fill up the form']
      }
    }
    newData = {
      ...newData,
      ...metaData,
      // paymentMethod: method,
      channel: method,
      status: mode == 'confirmation' ? 'paid' : 'pending',
      reason,
      total:
        mode == 'confirmation' ? total / 2 : total / 2 - (total / 2) * 0.05,
      reservation_id: id,
    }
    // if (mode == 'confirmation') {
    // end of validation
    console.log(newData)
    if (temp_error == null) {
      action(newData)
    }
    setError(temp_error)
  }
  const cardNumberRef = useRef()
  const expiryDateRef = useRef()
  const cvvRef = useRef()
  const gcashFullnameRef = useRef()
  const visaFullnameRef = useRef()
  const phoneNumberRef = useRef()

  const gcash = () => {
    return (
      <>
        <input
          type="number"
          ref={phoneNumberRef}
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
          placeholder="Paypal Number"
        />
        <input
          type="text"
          ref={gcashFullnameRef}
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
          placeholder="Full Name"
        />
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
  const visa = () => {
    return (
      <>
        <input
          type="number"
          ref={cardNumberRef}
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
          placeholder="Card Number"
        />
        <div>
          <input
            type="number"
            ref={expiryDateRef}
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
            placeholder="Expiry Date (MM/YY)"
          />
          <input
            type="number"
            ref={cvvRef}
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
            placeholder="CVV"
          />
        </div>
        <input
          type="text"
          ref={visaFullnameRef}
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
          placeholder="Name on Card"
        />
        {actionsBtn()}
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
              if (cardNumberRef.current?.value != null) {
                cardNumberRef.current.value = ''
              }
              setMethod('Paypal')
            }}
            src={'/paypal.png'}
            className={`aspect-video h-24 rounded-md border-2 ${
              method == 'Paypal' && 'border-emerald-500'
            }`}
          />
          {/* <img
            onClick={() => {
              if (phoneNumberRef.current?.value != null) {
                phoneNumberRef.current.value = ''
              }

              setMethod('Visa')
            }}
            src={'/visa.png'}
            className={`aspect-video h-24 rounded-md border-2 ${
              method == 'Visa' && 'border-emerald-500'
            } bg-white p-4`}
          /> */}
        </div>
        <div className="px-4">{method == 'Paypal' ? gcash() : visa()}</div>
      </div>
    </div>
  )
}

export default PaymentLayout
