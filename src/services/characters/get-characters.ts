export const getCharacters = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/character`)
  const resParsed = await res.json()
  return resParsed
}
