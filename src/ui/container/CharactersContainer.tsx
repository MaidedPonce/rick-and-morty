import React, { useContext, useEffect } from 'react'
import { getCharacters } from '../../services/characters/get-characters'
import Card from '../components/Character'
import { UserContext } from 'src/context'

const CardContainer = () => {
  const { setCharacters, characters, isFavorite, addFavorite } =
    useContext(UserContext)

  useEffect(() => {
    getCharacters().then((i) => {
      setCharacters(i?.results)
    })
  }, [])

  return (
    <div className='flex flex-wrap justify-center gap-6 px-6 my-10 md:justify-between'>
      {characters.map((character, index) => (
        <Card
          key={index}
          character={character}
          addFavorite={addFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  )
}

export default CardContainer
