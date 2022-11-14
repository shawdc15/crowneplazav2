import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { daysOfCurrentMonth } from '../../services/calendar.services'
import { getByDate } from '../../services/event.services'
import { ArrowLeftSvg, ArrowRightSvg } from '../Svg'
import { CalendarModal } from '..'
const Calendar = () => {
  const dateHandler = async (date) => {
    const { success, data } = await getByDate(date)
    if (success) {
      setData(data)
    }
  }
  const [modalMode, setModalMode] = useState('')
  const selectedDateNo = useRef(moment().format('DD') - 1)
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD')
  )
  const [currentMonth, setCurrentMonth] = useState(moment())
  const daysRef = useRef(daysOfCurrentMonth())
  const [data, setData] = useState()
  useEffect(async () => {
    const newData = {
      date: moment().clone().format('YYYY-MM-DD'),
    }
    const { success, data } = await getByDate(newData.date)
    if (success) {
      setData(data)
    }
  }, [])
  const navigateHandler = (arrow) => {
    if (arrow == 'next') {
      let nextNewData = moment(currentMonth).add(1, 'M')
      daysRef.current = daysOfCurrentMonth(nextNewData)
      setCurrentMonth(nextNewData)
    } else {
      let previousNewData = moment(currentMonth).add(-1, 'M')
      daysRef.current = daysOfCurrentMonth(previousNewData)
      setCurrentMonth(previousNewData)
    }
  }
  const eventRef = useRef()
  const { year, month, days, startDay, weekdays, monthNo } = daysRef?.current
  const start = `gridColumn-${startDay + 1}`
  const idRef = useRef()
  return (
    <>
      <CalendarModal
        mode={modalMode}
        data={data}
        setData={setData}
        setMode={setModalMode}
        eventRef={eventRef}
        date={selectedDate}
        id={idRef.current || ''}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        <div className="max-h-note w-full overflow-auto border px-8">
          <div className="flex items-center justify-between">
            <p className="my-5 text-xl ">Notes</p>{' '}
            <button
              onClick={() => setModalMode('add')}
              className="rounded-md bg-slate-800 p-2 px-6 text-white"
            >
              Add
            </button>
          </div>
          {data?.map(({ event, _id }, key) => (
            <div
              className="my-4 cursor-pointer rounded-md border p-4 transition-colors hover:bg-slate-700 hover:text-slate-100"
              key={key}
            >
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    idRef.current = _id

                    eventRef.current = { ...eventRef.current, value: event }
                    setModalMode('update')
                  }}
                  className="rounded-md border bg-white p-2 text-sm text-slate-900"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    idRef.current = _id
                    setModalMode('delete')
                  }}
                  className="rounded-md border bg-white p-2 text-sm text-slate-900"
                >
                  Delete
                </button>
              </div>
              <p className="my-4">{event}</p>
            </div>
          ))}
          {data && data.length == 0 && (
            <p className="text-center font-semibold">No Notes</p>
          )}
        </div>
        <div className="w-full border px-4 ">
          <div>
            <div className="flex items-center justify-between p-4">
              <p className="text-xl">
                {month} {year}
              </p>
              <div>
                <button
                  className="p-2 text-slate-700 "
                  onClick={() => navigateHandler('previous')}
                >
                  <ArrowLeftSvg />
                </button>
                <button
                  className="p-2 text-slate-700 "
                  onClick={() => {
                    navigateHandler('next')
                  }}
                >
                  <ArrowRightSvg />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 place-items-center">
              {weekdays &&
                weekdays.map((item) => (
                  <span key={item} className="mb-2 p-4 text-center text-xs">
                    {item}
                  </span>
                ))}
              {days.map((item, index) => (
                <div
                  onClick={() => {
                    selectedDateNo.current = item
                    dateHandler(
                      moment(`${year}-${monthNo}-${item + 1}`)
                        .clone()
                        .format('YYYY-MM-DD')
                    )
                    setSelectedDate(
                      moment(`${year}-${monthNo}-${item + 1}`)
                        .clone()
                        .format('YYYY-MM-DD')
                    )
                  }}
                  className={`${
                    item == 0 ? start : ''
                  } flex aspect-square w-full cursor-pointer flex-col items-center ${
                    selectedDateNo.current == item &&
                    selectedDate ==
                      `${year}-${monthNo}-${
                        item + 1 < 10 ? `0${item + 1}` : item + 1
                      }` &&
                    'bg-emerald-400'
                  }  justify-center border border-slate-100 text-sm text-slate-700 `}
                  key={`${month}${index}`}
                >
                  {item + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar
