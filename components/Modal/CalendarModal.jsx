import React from 'react'
import ModalLayout from '../Layout/ModalLayout'
import moment from 'moment'
import {
  addByDate,
  updateById,
  deleteById,
} from '../../services/event.services'
const CalendarModal = ({
  mode,
  data,
  id,
  date,
  setData,
  eventRef,
  setMode,
}) => {
  const addHandler = async () => {
    if (eventRef.current) {
      const newData = {
        event: eventRef.current.value,
        date: date,
      }
      const res = await addByDate(newData)
      if (res.success) {
        setMode('')
        setData([...data, res.data])
      }
    }
  }
  const updateHandler = async () => {
    if (eventRef.current) {
      const newData = {
        event: eventRef.current.value,
        date: date,
      }

      const res = await updateById(newData, id)
      if (res.success) {
        let temp = []
        for (let i of data) {
          if (i._id == id) {
            i.event = newData.event
          }
          temp.push(i)
        }
        setData(temp)
        setMode('')
      }
    }
  }

  const deleteHandler = async () => {
    const res = await deleteById(id)
    if (res.success) {
      setMode('')
      let temp = []
      for (let i of data) {
        if (i._id != id) {
          temp.push(i)
        }
      }
      setData(temp)
    }
  }
  return (
    <>
      {mode == 'add' && (
        <ModalLayout>
          <div className="flex min-h-min min-w-card flex-col">
            <p className="text-xl font-semibold">Add Notes on</p>
            <p className="my-2">{moment(date).format('MMM DD, YYYY')}</p>
            <textarea
              className="my-2 rounded-md border border-slate-300 px-4 py-3 "
              ref={eventRef}
              type="text"
              placeholder="Enter text here"
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setMode('')}
                className="my-2 w-full rounded-md bg-slate-100 px-4 py-4"
              >
                Close
              </button>
              <button
                onClick={addHandler}
                className="my-2 w-full rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
      {mode == 'update' && (
        <ModalLayout>
          <div className="flex min-h-min min-w-card flex-col">
            <p className="text-xl font-semibold">Update Note</p>
            <textarea
              className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
              ref={eventRef}
              type="text"
              defaultValue={eventRef.current.value}
              placeholder="Enter text here"
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setMode('')}
                className="my-2 w-full rounded-md bg-slate-100 px-4 py-4"
              >
                Close
              </button>
              <button
                onClick={updateHandler}
                className="my-2 w-full rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
      {mode == 'delete' && (
        <ModalLayout>
          <div className="flex min-h-min min-w-card flex-col">
            <p className="text-xl font-semibold">Delete Note</p>
            <p className="my-4">Are you sure you want to delete this note?</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setMode('')}
                className="my-2 w-full rounded-md bg-slate-100 px-4 py-4"
              >
                Close
              </button>
              <button
                onClick={deleteHandler}
                className="my-2 w-full rounded-md bg-slate-900 px-4 py-2 text-slate-300 hover:text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
    </>
  )
}

export default CalendarModal
