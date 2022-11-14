export const getPaymentById = async (id) => {
  const res = await fetch(`/api/payment/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
