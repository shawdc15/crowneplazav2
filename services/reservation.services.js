export const getCustomerReservation = async (id) => {
  const res = await fetch(`/api/reservation/customer/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const reservationReports = async () => {
  const res = await fetch(`/api/reservation`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const getOneReservation = async (id) => {
  const res = await fetch(`/api/reservation/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const updateStatus = async (id, newData) => {
  const res = await fetch(`/api/reservation/${id}`, {
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

export const addReservation = async (newData) => {
  const res = await fetch(`/api/reservation`, {
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

export const getReservationByStatus = async (status) => {
  const res = await fetch(`/api/reservation/status/` + status, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const getReservationById = async (id) => {
  const res = await fetch(`/api/reservation/` + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const getAllReserved = async () => {
  const res = await fetch(`/api/reservation/status/reserved`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const getAvailableRooms = async (newData) => {
  const res = await fetch(`/api/reservation/available`, {
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
