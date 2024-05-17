import React, { useContext, useEffect } from 'react'
import { getCharacters } from 'src/services/characters/get-characters'
import { UserContext } from 'src/context'
import Character from 'src/ui/components/Character'

const CardContainer: React.FC = () => {
  const { setCharacters, characters, isFavorite } = useContext(UserContext)

  useEffect(() => {
    getCharacters().then((i) => {
      setCharacters(i?.results)
    })
  }, [setCharacters])

  return (
    <div className='flex flex-wrap justify-center gap-6 px-6 my-10 md:justify-between'>
      {characters.map((character, index) => (
        <Character key={index} character={character} isFavorite={isFavorite} />
      ))}
    </div>
  )
}

export default CardContainer
