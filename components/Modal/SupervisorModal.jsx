import React, { useRef, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useAppContext } from '../../context/AppContext'
import { updateStaff, createStaff } from '../../services/staff.services'
const SupervisorModal = ({ setModal, mode }) => {
  const { state, dispatch } = useAppContext()
  const emailRef = useRef(state.adminModalData?.email)
  const sectorRef = useRef()
  const lastNameRef = useRef()
  const firstNameRef = useRef()
  const [contact, setContact] = useState(state.adminModalData?.contact)
  const shiftRef = useRef()
  const employmentRef = useRef()

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
    if (sectorRef.current.value.trim().length < 1) {
      tempError = { ...tempError, usernameError: 'Sector must not be empty' }
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
    if (contact.length != 10) {
      tempError = { ...tempError, contactError: 'Contact must have 10 digits' }
    }
    setError(tempError)
    if (Object.keys(tempError)?.length == 0) {
      const newData = {
        email:
          emailRef.current?.value == undefined
            ? emailRef.current
            : emailRef.current?.value,
        username: sectorRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        contact: contact,
        role: 'supervisor',
        sector: sectorRef.current.value,
        shift: shiftRef.current.value,
        statusofemployment: employmentRef.current?.value,
      }
      if (mode === 'add') {
        newData.password = 'crowneplaza2022'
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
          <p className="text-lg font-semibold">
            {mode == 'add'
              ? 'Create Supervisor'
              : `Update "${state.adminModalData.email}"`}
          </p>
          <p
            onClick={() => setModal(false)}
            className="cursor-pointer text-slate-400 transition-colors hover:text-slate-900"
          >
            Close
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-rose-500">{error?.emailError}</span>
          <label className="mt-2 text-slate-600">Email</label>
          {mode == 'add' ? (
            <input
              type="email"
              ref={emailRef}
              className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
              placeholder="Email"
              defaultValue={state.adminModalData?.email}
            />
          ) : (
            <p className=" my-2 cursor-not-allowed rounded-md border border-slate-300 px-4 py-3 text-slate-600">
              {state.adminModalData?.email}
            </p>
          )}
          <span className="text-rose-500">{error?.usernameError}</span>
          <label className="mt-2 text-slate-600">Sector</label>
          <input
            type="text"
            ref={sectorRef}
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
            placeholder="Sector"
            defaultValue={state.adminModalData?.sector}
          />
          <span className="text-rose-500">{error?.firstNameError}</span>
          <label className="mt-2 text-slate-600">First Name</label>
          <input
            type="text"
            ref={firstNameRef}
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
            placeholder="First Name"
            defaultValue={state.adminModalData?.firstName}
          />
          <span className="text-rose-500">{error?.lastNameError}</span>
          <label className="mt-2 text-slate-600">Last Name</label>
          <input
            type="text"
            ref={lastNameRef}
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
            placeholder="Last Name"
            defaultValue={state.adminModalData?.lastName}
          />
          <div className="flex w-full flex-col">
            <span className="text-rose-500">{error?.contactError}</span>
            <label className="mt-2 text-slate-600">Contact Number</label>
            <div className="relative flex items-center ">
              <span className="absolute left-4">+63</span>
              <input
                id="fix"
                onChange={(e) => {
                  setContact(e.target.value.slice(0, 10))
                }}
                type="number"
                value={contact}
                className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 pl-12 "
                placeholder="9xxxxxxxxx"
              />
            </div>
          </div>
        </div>
        <span className="text-rose-500">{error?.shiftError}</span>
        <label className="mt-2 text-slate-600">Shift</label>
        <select
          ref={shiftRef}
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
          defaultValue={state.adminModalData?.shift}
        >
          <option value="morning">Morning</option>
          <option value="night">Night</option>
        </select>
        <label className="mt-2 text-slate-600">Status of Employment</label>
        <select
          ref={employmentRef}
          defaultValue={state.adminModalData?.statusofemployment}
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
        >
          <option value="working">Working</option>
          <option value="resigned">Resigned</option>
          <option value="leave">Leave</option>
        </select>
        <div className="my-4">
          <button className="w-full cursor-pointer rounded-md bg-emerald-500 py-2 text-white">
            Submit
          </button>
        </div>
      </form>
    </ModalLayout>
  )
}

export default SupervisorModal
