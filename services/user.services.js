export const authRegister = async (newData) => {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  console.log(result)
  return result
}

export const authLogin = async (newData) => {
  const res = await fetch('/api/auth/login', {
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
export const validateEmail = async (email) => {
  const res = await fetch('/api/user/forgot_password/validate/' + email, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const validateId = async (id) => {
  const res = await fetch('/api/user/' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const changePassword = async (id, newData) => {
  const res = await fetch('/api/user/' + id, {
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

export const getUser = async () => {
  const res = await fetch('/api/auth/checkAuth', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const authLogout = async (newData) => {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const updateUserProfile = async (newData, id) => {
  const res = await fetch(`/api/user/${id}`, {
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

export const updateUserPassword = async (newData, id) => {
  console.log('id', newData)
  const res = await fetch(`/api/user/change_password/${id}`, {
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

export const sendPasswordLink = async (newData) => {
  console.log('id', newData)
  const res = await fetch(`/api/sendGrid`, {
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

export const getGuestList = async () => {
  const res = await fetch(`/api/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
