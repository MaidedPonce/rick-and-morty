export const getLocations = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/location`)
  const resParsed = await res.json()
  return resParsed
}
