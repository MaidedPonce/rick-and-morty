import { useEffect, useState } from 'react'
import Header from '../layout/Header'
import { getCharacters } from '../services/characters/get-characters'
import Card from '../components/Card'

const Home = () => {
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    getCharacters().then((i) => {
      setCharacters(i?.results)
    })
  }, [])
  return (
    <>
      <Header />
      {characters.map((character, index) => (
        <Card key={index} character={character} />
      ))}
    </>
  )
}

export default Home
