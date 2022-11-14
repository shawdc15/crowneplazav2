export const adminSearches = (key, data, value) => {
  const temp_data = data.filter((d) => d[key].includes(value))
  return temp_data
}
