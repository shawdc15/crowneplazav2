import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import { getOneActiveAccommodation } from '../../services/accommodation.services'
import { Footer } from '../../components'
import { useAppContext } from '../../context/AppContext'
import {
  addReservation,
  getAvailableRooms,
} from '../../services/reservation.services'
import { getActiveVoucher } from '../../services/voucher.services'
import { BackSvg } from '../../components/Svg'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../services/firebase'

const BookCard = ({ id, children, role }) => {
  const [dataPolicy, setDataPolicy] = useState(false)
  const [adultError, setAdultError] = useState(false)
  const [bedError, setBedError] = useState(false)
  const [childrenError, setChildrenError] = useState(false)
  const [data, setData] = useState()
  const { state, dispatch } = useAppContext()
  const [success, setSuccess] = useState(false)
  const [voucherData, setVoucherData] = useState([])
  const [loading, setLoading] = useState()
  const mounted = useRef()
  const router = useRouter()
  const uploadFile = () => {
    for (let i = 0; i < arrayOfVaccination.length; i++) {
      if (arrayOfVaccination[i].file == null) return
      const imageRef = ref(
        storage,
        `images/${arrayOfVaccination[i].file.name + v4()}`
      )
      uploadBytes(imageRef, arrayOfVaccination[i].file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          arrayOfVaccinationRef.current = [
            ...arrayOfVaccinationRef.current,
            url,
          ]
          if (arrayOfVaccination.length == i + 1) {
            finalHandler()
          }
        })
      })
    }
  }
  const finalHandler = async () => {
    const newData = {
      image: data?.image,
      name:
        role == 'customer'
          ? `${state.user?.firstName} ${state.user?.lastName}`
          : nameRef.current?.value,
      roomType: data?.roomName,
      checkIn: checkIn,
      checkOut: checkOut,
      // noOfGuest: guestRef.current?.value,
      noOfAdult: noAdult,
      noOfChildren: noChildren,
      noOfExtraBed: extraBeds,
      // purposeOfStay: purposeOfStayRef.current?.value,
      remarks: remarksRef.current?.value,
      user_id: state.user?._id,
      email: state.user?.email,
      accomodation_id: id,
      status: role == 'customer' ? 'requested' : 'reserved',
      preferredRoom: roomRef.current?.value,
      total: total,
    }
    if (role != 'receptionist') {
      newData = { ...newData, vaccination: arrayOfVaccinationRef?.current }
    }
    const res = await addReservation(newData)
    if (res.success) {
      setSuccess(false)
      router.push(
        role == 'customer'
          ? '/customer/reservation'
          : '/receptionist/reserved_list'
      )
    } else {
      console.log(res)
      setLoading(false)
      setSuccess(true)
    }
  }
  const paymentHandler = async (e) => {
    console.log('datapolicy ', dataPolicy)
    e.preventDefault()
    if (role == 'customer' && !state.isAuth) {
      dispatch({ type: 'OPEN_LOGIN_MODAL' })
    } else {
      if (
        (arrayOfVaccination.length > 0 &&
          diffRef.current > 0 &&
          noAdult > 0 &&
          noAdult <= data?.maxAdult &&
          noChildren <= data?.maxChildren &&
          dataPolicy) ||
        (arrayOfVaccination.length > 0 &&
          diffRef.current > 0 &&
          nameRef.current?.value &&
          noAdult > 0 &&
          noAdult <= data?.maxAdult &&
          noChildren <= data?.maxChildren &&
          dataPolicy)
      ) {
        setLoading(true)
        uploadFile()
      } else if (
        ((diffRef.current > 0 &&
          noAdult > 0 &&
          noAdult <= data?.maxAdult &&
          noChildren <= data?.maxChildren) ||
          (diffRef.current > 0 &&
            nameRef.current?.value &&
            noAdult > 0 &&
            noAdult <= data?.maxAdult &&
            noChildren <= data?.maxChildren)) &&
        role == 'receptionist'
      ) {
        setLoading(true)
        finalHandler()
      } else {
        setSuccess(true)
      }
    }
  }
  // fields
  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckOut] = useState()
  // const guestRef = useRef()
  const [noAdult, setNoAdult] = useState(0)
  const [noChildren, setNoChildren] = useState(0)
  const [extraBeds, setExtraBeds] = useState(0)
  // const purposeOfStayRef = useRef()
  const remarksRef = useRef()
  const roomRef = useRef()
  const [total, setTotal] = useState(data?.price)
  const diffRef = useRef()
  const selectedVoucherRef = useRef()
  const [arrayOfVaccination, setArrayOfVaccination] = useState([])
  const arrayOfVaccinationRef = useRef([])
  const nameRef = useRef()

  useEffect(() => {
    const load = async () => {
      const { success, data } = await getOneActiveAccommodation(id)
      const res = await getActiveVoucher()
      if (res.success) {
        setVoucherData(res.data)
      }
      if (success) {
        setTotal(data.price)
        setData(data)
      }
      if (id) {
        mounted.current = true
      }
    }
    if (!mounted.current) {
      load()
    }
  })
  const [avail, setAvail] = useState(data?.roomNo)
  const filteredRoom = data?.roomNo.filter((val) => !avail?.includes(val))
  const formatTotal = (x = 0) => {
    const xx = parseFloat(x).toFixed(2)
    return xx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const stayInHandler = async (mode, value) => {
    const start_raw = mode == 'start' ? value : checkIn
    const end_raw = mode == 'end' ? value : checkOut
    const start = moment(start_raw, 'YYYY-MM-DD')
    const end = moment(end_raw, 'YYYY-MM-DD')
    const diff = moment.duration(end.diff(start)).asDays()
    diffRef.current = diff
    if (diff) {
      discountHandler()
    }
    const verifier = {
      checkIn: start_raw,
      checkOut: end_raw,
      accomodation_id: id,
    }
    if (start_raw && end_raw) {
      const available_room = await getAvailableRooms(verifier)
      setAvail(available_room.data)
    }
  }

  const discountHandler = (beds = extraBeds) => {
    let discount = 0
    let overall = 0
    let x = data?.price * diffRef.current + beds * 1000
    if (selectedVoucherRef.current) {
      discount = parseInt(selectedVoucherRef.current?.discount)
      overall = x - discount
      if (selectedVoucherRef.current?.discount_type == 'Percent') {
        discount = x * (parseInt(selectedVoucherRef.current?.discount) / 100)
      }
    }
    if (overall <= 0) {
      selectedVoucherRef.current = null
      setTotal(x)
    } else {
      selectedVoucherRef.current = {
        ...selectedVoucherRef.current,
        newDiscount: discount,
      }
      setTotal(x - discount)
    }
  }
  const removeImageHandler = (id) => {
    let temp_image = []
    for (let i = 0; i < arrayOfVaccination.length; i++) {
      if (id != i) {
        temp_image.push(arrayOfVaccination[i])
      }
    }
    setArrayOfVaccination(temp_image)
  }
  return (
    <>
      <Head>
        <title>Accommodation | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      {/* {modal == 'confirmation' && <ConfirmReceiptModal />} */}
      {/* <form */}
      {/* // onSubmit={paymentHandler}
        className="mx-auto mb-auto w-full max-w-container"
      > */}
      {data && (
        <>
          <div className="mx-auto mb-auto max-w-container">
            <div className="mb-2 flex items-center">
              {role == 'customer' ? (
                <Link href="/customer/accommodation">
                  <button className="">
                    <BackSvg />
                  </button>
                </Link>
              ) : (
                <Link href={`/${role}/book`}>
                  <button className="">
                    <BackSvg />
                  </button>
                </Link>
              )}
              <h1 className=" py-2 px-4 text-2xl text-slate-900">
                Reservation Form
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="p-4">
                <Image
                  width={1000}
                  height={500}
                  src={data?.image || '/thumbnail.png'}
                  alt={data?.roomName}
                  className="h-80 w-full rounded-lg object-cover drop-shadow-md"
                />
                <p className="pt-4 text-xl">{data?.roomName}</p>
                <p className="py-3">&#8369; {formatTotal(data?.price)}</p>
                <p className="py-4 text-gray-700">{data?.description}</p>
                <p>
                  Note: {data?.note}
                  <br />
                </p>
                <ul className="ml-6 list-disc">
                  <li>8 years old and below will free of charge.</li>
                  <li>Extra Bed costs 1000 pesos each.</li>
                  <li>Maximum Capacity of room:</li>
                </ul>
                <p className="indent-4">- {data?.maxAdult} Adult</p>
                <p className="indent-4">- {data?.maxChildren} Children</p>
              </div>
              <div className="p-4">
                {success && (
                  <div className="mb-4 flex items-center justify-between rounded-md bg-rose-500 p-4 text-white transition-all delay-75">
                    <p>Please fill up the form!</p>
                    <span
                      onClick={() => setSuccess(false)}
                      className="cursor-pointer text-white underline"
                    >
                      Close
                    </span>
                  </div>
                )}
                <form onSubmit={paymentHandler}>
                  {role != 'customer' && (
                    <div>
                      <label htmlFor="room">Full Name</label>
                      <input
                        type="text"
                        ref={nameRef}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        id="name"
                        placeholder=""
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkIn">Check In</label>
                      <input
                        onChange={(e) => {
                          stayInHandler('start', e.target.value)
                          setCheckIn(e.target.value)
                        }}
                        min={moment().format('YYYY-MM-DD')}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="date"
                        id="checkIn"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkOut">Check Out</label>
                      <input
                        onChange={(e) => {
                          stayInHandler('end', e.target.value)
                          setCheckOut(e.target.value)
                        }}
                        min={moment(checkIn)
                          .add(1, 'days')
                          .format('YYYY-MM-DD')}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="date"
                        id="checkOut"
                      />
                    </div>
                    <div>
                      <label htmlFor="room">Preferred Room No.</label>
                      <select
                        ref={roomRef}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        id="room"
                      >
                        {filteredRoom.map((roomNo, index) => (
                          <option key={index} value={roomNo}>
                            {roomNo}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div>
                      <label htmlFor="noOfGuests">No of Guests</label>
                      <input
                        minLength={0}
                        min={0}
                        defaultValue={0}
                        ref={guestRef}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="number"
                        id="noOfGuests"
                      />
                    </div> */}
                    <div>
                      {adultError && (
                        <span className="text-rose-500">
                          Number of guests has exceeded the given maximum
                          capacity.
                          <br />
                        </span>
                      )}
                      <label htmlFor="noOfAdults">
                        No of Adults (max of {data?.maxAdult})
                      </label>
                      <input
                        value={noAdult || 0}
                        min={0}
                        onChange={(e) => {
                          let ct = e.target.value
                          if (ct < 0) {
                            console.log('true')
                            setNoAdult(0)
                          } else {
                            setNoAdult(parseInt(ct))
                          }
                          if (parseInt(ct) > data?.maxAdult) {
                            setAdultError(true)
                          } else {
                            setAdultError(false)
                          }
                        }}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="number"
                        id="noOfAdults"
                      />
                    </div>
                    <div>
                      {childrenError && (
                        <span className="text-rose-500">
                          Number of guests has exceeded the given maximum
                          capacity.
                          <br />
                        </span>
                      )}
                      <label htmlFor="noOfChildren">
                        No of Children (max of {data?.maxChildren})
                      </label>
                      <input
                        minLength={0}
                        min={0}
                        onChange={(e) => {
                          let ct = e.target.value
                          if (ct < 0) {
                            console.log('true')
                            setNoChildren(0)
                          } else {
                            setNoChildren(parseInt(ct))
                          }
                          if (parseInt(ct) > data?.maxChildren) {
                            setChildrenError(true)
                          } else {
                            setChildrenError(false)
                          }
                        }}
                        value={noChildren || 0}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="number"
                        id="noOfChildren"
                      />
                    </div>
                    <div>
                      {bedError && (
                        <span className="text-rose-500">
                          Number of beds has exceeded the given maximum
                          capacity.
                          <br />
                        </span>
                      )}
                      <label htmlFor="noOfExtraBeds">
                        No of Extra Beds (max of {data?.maxBed})
                      </label>
                      <input
                        onChange={(e) => {
                          let ct = e.target.value

                          if (parseInt(ct) >= data?.maxChildren) {
                            setBedError(true)
                          } else {
                            setBedError(false)
                          }
                          if (ct >= 0) {
                            setExtraBeds(parseInt(ct))
                            if (diffRef.current) {
                              discountHandler(parseInt(ct))
                            }
                          } else {
                            console.log('true')
                            setExtraBeds(0)
                          }
                        }}
                        value={extraBeds || 0}
                        // onKeyPress={(e) => setExtraBeds(e.target.value)}
                        minLength={0}
                        min="0"
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="number"
                        id="noOfExtraBeds"
                      />
                    </div>
                    <div>
                      <label htmlFor="voucherCode">Voucher Code</label>
                      <select
                        id="voucherCode"
                        onChange={(e) => {
                          const selected = voucherData.filter(
                            (item) => item.voucher_code == e.target.value
                          )
                          selectedVoucherRef.current = selected[0]
                          discountHandler()
                        }}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                      >
                        <option value="" defaultChecked>
                          -- Select Voucher --
                        </option>
                        {diffRef.current &&
                          voucherData.map((item, index) =>
                            item.discount_type == 'Percent' ||
                            (item.discount_type == 'Currency' &&
                              parseInt(item.discount) <
                                data?.price * diffRef.current +
                                  extraBeds * 1000) ? (
                              <option key={index} value={item.voucher_code}>
                                {item.voucher_code} ({item.description})
                              </option>
                            ) : (
                              <option disabled key={index}>
                                {item.voucher_code} ({item.description})
                              </option>
                            )
                          )}
                      </select>
                    </div>
                    {/* <div>
                      <label htmlFor="purposeOfStay">Purpose of stay</label>
                      <select
                        ref={purposeOfStayRef}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        id="purposeOfStay"
                      >
                        <option value="Vacation">Vacation</option>
                        <option value="Occassion">Occassion</option>
                        <option value="One Night">One Night</option>
                      </select>
                    </div> */}
                    <div>
                      <label htmlFor="remarks">Remarks/ Requests</label>
                      <input
                        ref={remarksRef}
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                        type="text"
                        id="remarks"
                      />
                    </div>
                    {role == 'customer' && (
                      <div className="col-span-2">
                        <label htmlFor="id">
                          Vaccination Cards and valid IDs for each guest
                        </label>
                        <p>Note: Maximum of 10 uploads</p>
                        {arrayOfVaccination.length < 10 && (
                          <input
                            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                            type="file"
                            id="id"
                            onChange={(e) => {
                              try {
                                setArrayOfVaccination([
                                  ...arrayOfVaccination,
                                  {
                                    url: URL?.createObjectURL(
                                      e.target.files[0]
                                    ),
                                    file: e.target.files[0],
                                  },
                                ])
                              } catch (er) {
                                console.log(er)
                              }
                            }}
                            accept="image/*"
                          />
                        )}
                      </div>
                    )}
                    <div className="col-span-2 flex flex-wrap">
                      {arrayOfVaccination.map(({ url }, index) => (
                        <div
                          key={index}
                          className="relative aspect-square w-1/2 bg-slate-900/40"
                          onClick={() => removeImageHandler(index)}
                        >
                          <div className="absolute z-50 flex aspect-square h-full w-full cursor-pointer items-center justify-center bg-slate-700/50 p-2 text-center font-semibold text-white">
                            <span className="text-md">Remove</span>
                          </div>
                          <img
                            src={url}
                            className="aspect-square object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-span-2">
                      <input
                        type="checkbox"
                        id="policy"
                        onChange={() => setDataPolicy(!dataPolicy)}
                      />
                      <label className="ml-2 font-semibold" htmlFor="policy">
                        I have agree to submit my Vaccination Card along with my
                        Valid ID’s
                      </label>
                    </div>
                  </div>
                  <h1 className="my-4 text-2xl text-slate-900">CheckOut:</h1>
                  <table className="w-full p-4">
                    <tbody>
                      <tr className="bg-emerald-500  text-white">
                        <td className="p-2">Room ({data?.roomName}) : x1 </td>
                        <td>&#8369; {formatTotal(data?.price)}</td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          No. of Day's: x{diffRef.current ? diffRef.current : 0}
                        </td>
                        <td>
                          &#8369;{' '}
                          {diffRef.current
                            ? formatTotal(data?.price * diffRef.current)
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          Voucher:{' '}
                          {selectedVoucherRef?.current?.description &&
                            `(${selectedVoucherRef?.current?.description})`}
                        </td>
                        <td>
                          &#8369;{' '}
                          {formatTotal(
                            selectedVoucherRef?.current?.newDiscount
                          ) || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          No. Extra of Bed's: x{extraBeds}
                        </td>
                        <td>&#8369; {formatTotal(1000 * extraBeds)}</td>
                      </tr>
                      <tr className="m-2 border-t-2 border-dashed">
                        <td className="p-2">Overall Amount:</td>
                        <td>&#8369; {formatTotal(total)}</td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          {!loading ? (
                            role == 'customer' ? (
                              <button className=" my-2 w-full rounded-md bg-gray-900 p-3 text-slate-100 disabled:bg-slate-600">
                                Make a request
                              </button>
                            ) : (
                              <button className=" my-2 w-full rounded-md bg-gray-900 p-3 text-slate-100 disabled:bg-slate-600">
                                Book this Room
                              </button>
                            )
                          ) : (
                            <p className=" my-2 w-full rounded-md bg-gray-900 p-3 text-center text-slate-100 disabled:bg-slate-600">
                              Processing...
                            </p>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      {/* </form> */}
    </>
  )
}

export default BookCard
