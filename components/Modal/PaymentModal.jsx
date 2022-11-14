import React from 'react'
import { useEffect, useState } from 'react'
import { getPaymentById } from '../../services/payment.services'
import Paypal from '../Customer/Paypal'
import ModalLayout from '../Layout/ModalLayout'
import moment from 'moment'
import { updateStatus } from '../../services/reservation.services'
const PaymentModal = ({ closeHandler, id }) => {
  const [valid, setValid] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  useEffect(() => {
    const load = async () => {
      const res = await getPaymentById(id)
      if (res.success) {
        if (res.data.status == 'reserved') {
          setValid(0)
        }
        if (
          moment(res.data.end_expiration).clone().format('YYYY-MM-DD HH:mm') <
          moment().clone().format('YYYY-MM-DD HH:mm')
        ) {
          await updateStatus(id, { status: "Cancelled (didn't pay)" })
          setValid(0)
        }
        setData(res.data)
      } else {
        setValid(0)
      }
      setIsLoading(false)
      setValid(true)
    }
    load()
  }, [])
  return (
    <ModalLayout>
      <p>
        {' '}
        {isLoading
          ? 'Please wait as we try to validate the reservation first before we continue... '
          : valid == 1
          ? 'Validation of reservation is a success, You can now make a payment through paypal account.'
          : valid == 0 &&
            'Sorry it seems the reservation is already expired or reserved!'}
      </p>
      {!isLoading ? (
        valid == 1 && (
          <Paypal
            description={`${data.roomType.toUpperCase()} ${data.preferredRoom.toUpperCase()}`}
            value={data.total + ''}
          />
        )
      ) : (
        <button
          onClick={closeHandler}
          className="w-full rounded-md bg-emerald-500 px-4 text-white"
        >
          Close
        </button>
      )}
    </ModalLayout>
  )
}

export default PaymentModal
