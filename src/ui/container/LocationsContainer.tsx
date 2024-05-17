import React, { useContext, useEffect } from 'react'
import { UserContext } from 'src/context'
import { getLocations } from 'src/services/characters/get-locations'
import Location from '../components/Location'

export interface LocationType {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: Date
}

const LocationsContainer = () => {
  const { setLocations, locations, isFavorite, addFavorite } =
    useContext(UserContext)

  useEffect(() => {
    getLocations().then((i) => {
      setLocations(i?.results)
    })
  }, [])
  return (
    <div className='flex flex-wrap justify-center gap-6 px-6 my-10 md:justify-between'>
      {locations.map((location: LocationType, index: number) => (
        <Location
          key={index}
          location={location}
          addFavorite={addFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  )
}

export default LocationsContainer
