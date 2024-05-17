import React, { useContext } from 'react'
import { UserContext } from 'src/context'
import Character from 'src/ui/components/Character'
import Location from 'src/ui/components/Location'

const Favorites: React.FC = () => {
  const {
    user: { favorites },
    isFavorite,
  } = useContext(UserContext)
  return (
    <div className='flex flex-wrap justify-center gap-6 px-6 my-10 md:justify-between'>
      {favorites.map((fav, index) => (
        <div key={index}>
          {fav.typeOfFav === 'location' ? (
            <Location key={fav.name} isFavorite={isFavorite} location={fav} />
          ) : (
            <Character key={fav.name} isFavorite={isFavorite} character={fav} />
          )}
        </div>
      ))}
    </div>
  )
}

export default Favorites
