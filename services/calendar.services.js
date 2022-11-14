import moment from 'moment'
export const daysOfCurrentMonth = (newData = moment()) => {
  const range = [...Array(newData.daysInMonth()).keys()]
  return {
    days: range,
    month: newData.format('MMMM'),
    monthNo: newData.format('MM'),
    year: newData.format('YYYY'),
    startDay: newData.clone().set('date', 1).day(),
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  }
}
// when housekeeping mounted this will trigger to check the accommodation if true then check the housekeeping if existing or not
export const checkHousekeeping = async (newData) => {
  const res = await fetch(`/api/housekeeping/todayData/one`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}

// adding records
export const addCalendarData = async (newData) => {
  const res = await fetch(`/api/housekeeping`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}

export const updateCalendarData = async (newData) => {
  const res = await fetch(`/api/housekeeping`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}

export const getHousekeepingById = async (id) => {
  const res = await fetch(`/api/housekeeping/` + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const getCalendarDataByDate = async (newData) => {
  const res = await fetch(`/api/housekeeping/todayData/all`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}
export const getAllCalendar = async () => {
  const res = await fetch(`/api/housekeeping`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
