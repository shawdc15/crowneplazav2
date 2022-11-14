// const dev = process.env.NODE_ENV !== 'production'

// export const server = dev
//   ? 'http://localhost:3000'
//   : 'https://your_deployment.server.com'

export const createAccommodation = async (newData) => {
  const res = await fetch(`/api/accommodation`, {
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

export const updateAccommodation = async (newData, id) => {
  const res = await fetch(`/api/accommodation/` + id, {
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

export const getActiveAccommodation = async () => {
  const res = await fetch(`/api/accommodation/active`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const getAllAccommodation = async () => {
  const res = await fetch(`/api/accommodation/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const getOneAccommodation = async (id) => {
  const res = await fetch(`/api/accommodation/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const getOneActiveAccommodation = async (id) => {
  const res = await fetch(`/api/accommodation/active/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

// export const calculateDays = (date1,date2) => {

// }
