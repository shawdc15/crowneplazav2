import React, { useRef, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useAppContext } from '../../context/AppContext'
import { updateStaff, createStaff } from '../../services/staff.services'
const GuestModal = ({ setModal, mode }) => {
  const { state, dispatch } = useAppContext()
  const emailRef = useRef(state.adminModalData?.email)
  const usernameRef = useRef()
  const lastNameRef = useRef()
  const firstNameRef = useRef()
  const contactRef = useRef()

  const [error, setError] = useState({})

  const submitHandler = async (e) => {
    e.preventDefault()
    let tempError = {}
    let temp_email =
      emailRef.current?.value == undefined
        ? emailRef.current
        : emailRef.current?.value
    if (temp_email.trim().length < 1) {
      tempError = { ...tempError, emailError: 'Email must not be empty' }
    }
    if (usernameRef.current.value.trim().length < 1) {
      tempError = { ...tempError, usernameError: 'Username must not be empty' }
    }
    if (firstNameRef.current.value.trim().length < 1) {
      tempError = {
        ...tempError,
        firstNameError: 'First Name must not be empty',
      }
    }
    if (lastNameRef.current.value.trim().length < 1) {
      tempError = { ...tempError, lastNameError: 'Last Name must not be empty' }
    }
    if (contactRef.current.value.trim().length < 1) {
      tempError = { ...tempError, contactError: 'Contact must not be empty' }
    }
    setError(tempError)
    if (Object.keys(tempError)?.length == 0) {
      const newData = {
        email:
          emailRef.current?.value == undefined
            ? emailRef.current
            : emailRef.current?.value,
        username: usernameRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        contact: contactRef.current.value,
        role: 'guest',
      }
      if (mode === 'add') {
        const res = await createStaff(newData)
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
        const res = await updateStaff(newData, state.adminModalData?._id)
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
  }
  return (
    <ModalLayout>
      <form onSubmit={submitHandler}>
        <div className="mb-6 flex items-center justify-between">
          {mode == 'add' ? (
            <p className="text-lg font-semibold capitalize">Create {role}</p>
          ) : (
            <p className="text-lg font-semibold">
              Update "{state.adminModalData.email}"
            </p>
          )}
          <p
            onClick={() => setModal(false)}
            className="cursor-pointer text-slate-400 transition-colors hover:text-slate-900"
          >
            Close
          </p>
        </div>
        <div className="flex w-screen max-w-sm flex-col">
          <span className="text-rose-500">{error?.emailError}</span>
          <label className="mt-2 text-slate-600">Email</label>
          {mode == 'add' ? (
            <input
              type="email"
              ref={emailRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Email"
              defaultValue={state.adminModalData?.email}
            />
          ) : (
            <p className=" my-2 cursor-not-allowed rounded-md border border-slate-300 px-4 py-3 text-slate-600">
              {state.adminModalData?.email}
            </p>
          )}

          <span className="text-rose-500">{error?.usernameError}</span>
          <label className="mt-2 text-slate-600">Username</label>
          <input
            type="text"
            ref={usernameRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="Username"
            defaultValue={state.adminModalData?.username}
          />
          <span className="text-rose-500">{error?.firstNameError}</span>
          <label className="mt-2 text-slate-600">First Name</label>
          <input
            type="text"
            ref={firstNameRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="First Name"
            defaultValue={state.adminModalData?.firstName}
          />

          <span className="text-rose-500">{error?.lastNameError}</span>
          <label className="mt-2 text-slate-600">Last Name</label>
          <input
            type="text"
            ref={lastNameRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="Last Name"
            defaultValue={state.adminModalData?.lastName}
          />

          <span className="text-rose-500">{error?.contactError}</span>
          <label className="mt-2 text-slate-600">Contact</label>
          <input
            type="number"
            ref={contactRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="Contact"
            defaultValue={state.adminModalData?.contact}
          />
        </div>
        <div className="my-4">
          <button className="w-full cursor-pointer rounded-md bg-emerald-500 py-2 text-white">
            Submit
          </button>
        </div>
      </form>
    </ModalLayout>
  )
}

export default GuestModal
