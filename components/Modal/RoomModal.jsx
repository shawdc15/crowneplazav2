import React, { useEffect, useRef, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useAppContext } from '../../context/AppContext'
import {
  updateAccommodation,
  createAccommodation,
} from '../../services/accommodation.services'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from 'firebase/storage'
import { storage } from '../../services/firebase'
import { v4 } from 'uuid'
import { CloseSvg } from '../Svg'

const RoomModal = ({ setModal, mode }) => {
  const [selectedLargeImage, setSelectedLargeImage] = useState(null)

  const [imageUpload, setImageUpload] = useState(null)
  const imageUrlRef = useRef()
  const [disabled, setDisabled] = useState(false)
  const { state, dispatch } = useAppContext()
  const roomNameRef = useRef(state.adminModalData?.roomName)
  const descriptionRef = useRef()
  const priceRef = useRef()
  const roomNoRef = useRef()
  const maxAdultRef = useRef()
  const maxChildrenRef = useRef()
  const maxBedRef = useRef()

  // const floorRef = useRef()
  const roomStatusRef = useRef()
  const noteRef = useRef()

  const [error, setError] = useState({})
  const uploadFile = () => {
    if (imageUpload?.file == null) return
    const imageRef = ref(storage, `images/${imageUpload.file.name + v4()}`)
    uploadBytes(imageRef, imageUpload.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        imageUrlRef.current = url
        finalHandler()
      })
    })
  }
  const finalHandler = async () => {
    const newData = {
      roomNo:
        roomNoRef.current?.value == undefined
          ? roomNoRef.current.join(',')
          : roomNoRef.current?.value.split(','),
      description: descriptionRef.current?.value,
      price: priceRef.current?.value,
      roomName: roomNameRef.current?.value,
      roomStatus: roomStatusRef.current?.value,
      maxAdult: maxAdultRef.current?.value,
      maxChildren: maxChildrenRef.current?.value,
      maxBed: maxBedRef.current?.value,
      note: noteRef.current?.value,
      image: imageUrlRef?.current || state.adminModalData?.image,
    }
    if (mode === 'add') {
      const res = await createAccommodation(newData)
      if (res.success) {
        dispatch({
          type: 'SET_SELECTED_DATA',
          value: [...state.selectedData, res.data],
        })
        setDisabled(false)

        setModal(false)
      } else {
        setError(res.errors)
        setDisabled(false)
      }
    } else {
      const res = await updateAccommodation(newData, state.adminModalData?._id)
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
        setDisabled(false)
        setModal(false)
      } else {
        setDisabled(false)
        setError(res.errors)
      }
    }
  }
  const submitHandler = async (e) => {
    setDisabled(true)
    e.preventDefault()
    let tempError = {}
    let temp_roomName =
      roomNameRef.current?.value == undefined
        ? roomNameRef.current
        : roomNameRef.current?.value
    if (temp_roomName.length < 1) {
      tempError = { ...tempError, roomNameError: 'Room Name must not be empty' }
    }
    if (descriptionRef.current.value.trim().length < 1) {
      tempError = {
        ...tempError,
        descriptionError: 'Description must not be empty',
      }
    }
    if (priceRef.current.value.length < 1 || priceRef.current.value < 1) {
      tempError = {
        ...tempError,
        priceError: 'Price must not be empty and not less than 1',
      }
    }
    if (roomNoRef.current.value.trim().length < 1) {
      tempError = { ...tempError, roomNoError: 'Room No must not be empty' }
    }
    if (maxAdultRef.current.value < 0) {
      tempError = {
        ...tempError,
        maxAdultError: 'Max adult must be higher or equal to 0',
      }
    }
    if (maxChildrenRef.current.value < 0) {
      tempError = {
        ...tempError,
        maxChildrenError: 'Max children must be higher or equal to 0',
      }
    }
    if (maxBedRef.current.value < 0) {
      tempError = {
        ...tempError,
        maxBedError: 'Max bed must be higher or equal to 0',
      }
    }
    if (roomStatusRef.current.value.trim().length < 1) {
      tempError = { ...tempError, roomStatus: 'Room Status must not be empty' }
    }
    if (noteRef.current.value.trim().length < 1) {
      tempError = { ...tempError, noteError: 'Note must not be empty' }
    }
    if (imageUpload == null && mode == 'add') {
      tempError = { ...tempError, imageError: 'Image must not be empty' }
      setDisabled(false)
    }
    setError(tempError)
    if (Object.keys(tempError)?.length == 0) {
      if (imageUpload) {
        uploadFile()
      } else {
        finalHandler()
      }
    } else {
      setDisabled(false)
    }
  }
  return (
    <ModalLayout>
      <form onSubmit={submitHandler}>
        <div className="mb-6 flex items-center justify-between">
          {mode == 'add' ? (
            <p className="text-lg font-semibold capitalize">Create Room</p>
          ) : (
            <p className="text-lg font-semibold">
              Update "{state.adminModalData.roomName}"
            </p>
          )}
          <p
            onClick={() => setModal(false)}
            className="cursor-pointer text-slate-400 transition-colors hover:text-slate-900"
          >
            Close
          </p>
        </div>
        <div className="grid max-h-60 grid-cols-1 gap-4 overflow-auto sm:max-h-screen sm:grid-cols-2 ">
          <div className="flex flex-col">
            <span className="text-rose-500">{error?.roomNameError}</span>
            <label className="mt-2 text-slate-600">Room Name</label>

            {mode == 'add' ? (
              <input
                type="roomName"
                ref={roomNameRef}
                className=" my-2 rounded-md border border-slate-300 px-4 py-3"
                placeholder="Room Name"
                defaultValue={state.adminModalData?.roomName}
              />
            ) : (
              <p className=" my-2 rounded-md border border-slate-300 px-4 py-3">
                {state.adminModalData?.roomName}
              </p>
            )}

            <span className="text-rose-500">{error?.descriptionError}</span>
            <label className="mt-2 text-slate-600">Description</label>
            <textarea
              ref={descriptionRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Description"
              defaultValue={state.adminModalData?.description}
            />

            <span className="text-rose-500">{error?.priceError}</span>
            <label className="mt-2 text-slate-600">Price</label>
            <input
              type="number"
              ref={priceRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Price"
              defaultValue={state.adminModalData?.price}
            />

            <span className="text-rose-500">{error?.maxAdultError}</span>
            <label className="mt-2 text-slate-600">Max Adult</label>
            <input
              type="number"
              ref={maxAdultRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Max Adult"
              defaultValue={state.adminModalData?.maxAdult || 0}
            />

            <span className="text-rose-500">{error?.maxChildrenError}</span>
            <label className="mt-2 text-slate-600">Max Children</label>
            <input
              type="number"
              ref={maxChildrenRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Max Children"
              defaultValue={state.adminModalData?.maxChildren || 0}
            />
            <label className="mt-2 text-slate-600">Max Bed</label>
            <input
              type="number"
              ref={maxBedRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Max Bed"
              defaultValue={state.adminModalData?.maxBed || 0}
            />

            <span className="text-rose-500">{error?.roomNoError}</span>
            <label className="mt-2 text-slate-600">Room No</label>
            <label className="mt-2 text-sm text-slate-600">
              Please separate the room number by comma
            </label>

            <input
              type="text"
              min={1}
              max={9999}
              ref={roomNoRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="101,102"
              defaultValue={state.adminModalData?.roomNo.join(',')}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-rose-500">{error?.roomStatus}</span>
            <label className="mt-2 text-slate-600">Status</label>
            <select
              ref={roomStatusRef}
              className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
              defaultValue={state.adminModalData?.roomStatus}
            >
              <option value="Active">Active</option>
              <option value="Not Active">Not Active</option>
            </select>

            <span className="text-rose-500">{error?.noteError}</span>
            <label className="mt-2 text-slate-600">Note</label>
            <textarea
              ref={noteRef}
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
              placeholder="Note"
              defaultValue={state.adminModalData?.note}
            />

            <span className="text-rose-500">{error?.imageError}</span>
            <label className="mt-2 text-slate-600">Image</label>
            <input
              type="file"
              onChange={(e) => {
                try {
                  setImageUpload({
                    url: URL?.createObjectURL(e.target?.files[0]),
                    file: e.target?.files[0],
                  })
                } catch (e) {
                  console.log(e)
                }
              }}
              accept="image/*"
              className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            />

            {selectedLargeImage != null && (
              <div className="absolute top-0 left-0 flex h-full w-full  items-center justify-center bg-black/60">
                <div className="relative">
                  <span
                    onClick={() => setSelectedLargeImage(null)}
                    className="absolute right-2 top-2 flex cursor-pointer items-center justify-center rounded-full bg-black/30 p-2"
                  >
                    <CloseSvg />
                  </span>
                  <img
                    className="z-50 h-screen max-h-note bg-white object-cover"
                    src={selectedLargeImage}
                  />
                </div>
              </div>
            )}
            {/* {mode == 'edit' && ( */}
            <img
              src={
                imageUpload?.url ||
                state.adminModalData?.image ||
                '/thumbnail.png'
              }
              alt={'/thumbnail.png'}
              className="aspect-video w-full object-cover"
            />
            {/* )} */}
            {(imageUpload?.url || state.adminModalData?.image) && (
              <button
                type="button"
                onClick={() =>
                  setSelectedLargeImage(
                    imageUpload?.url || state.adminModalData.image
                  )
                }
                className=" mt-5 rounded-md bg-slate-900 p-2 text-white"
              >
                View full screen
              </button>
            )}
          </div>
        </div>
        <div className="my-4">
          {!disabled ? (
            <button className="w-full cursor-pointer rounded-md bg-emerald-500 py-2 text-white">
              Submit
            </button>
          ) : (
            <p className="w-full cursor-pointer rounded-md bg-emerald-500 py-2 text-center text-white">
              Processing...
            </p>
          )}
        </div>
      </form>
    </ModalLayout>
  )
}

export default RoomModal
