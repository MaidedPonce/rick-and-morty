/* eslint-disable no-unused-vars */
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import {
  CharacterType,
  FavoriteButtonType,
  LocationType,
  UserType,
} from 'src/types'
import {
  getDocId,
  getFavorites,
  saveNewCollection,
  updateFavorites,
} from 'src/services/db'
import toast from 'react-hot-toast'

interface UserContextType {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  characters: CharacterType[]
  setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
  filterFavorites: () => Promise<void>
  locations: LocationType[]
  setLocations: React.Dispatch<React.SetStateAction<LocationType[]>>
  addFavorite: (character: CharacterType | LocationType) => Promise<void>
  isFavorite: (fav: string) => boolean
  deleteFavorite: (fav: string) => void
  handleFavoriteButton: ({ name, data }: FavoriteButtonType) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>({
    email: '',
    password: '',
    id: '',
    user_id: '',
    favorites: [],
  })

  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [locations, setLocations] = useState<LocationType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const filterFavorites = async () => {
    const doc = await getFavorites(user.user_id)
    const char = doc?.characters || []
    return setUser({
      ...user,
      favorites: [...user?.favorites, ...char],
    })
  }

  useEffect(() => {
    filterFavorites()
  }, [user.id])

  useEffect(() => {
    ;(async () => {
      const docs = await getDocId(user.user_id)
      setUser({ ...user, id: docs || '' })
    })()
  }, [user.user_id, user.favorites, user.email])

  const isFavorite = (fav: string) => {
    const verifyId = user.favorites.map((favs) => favs.name)
    return verifyId.includes(fav)
  }

  const addFavorite: (
    character: CharacterType | LocationType,
  ) => Promise<void> = async (character: CharacterType | LocationType) => {
    if (isFavorite(character.name)) return
    setUser({
      ...user,
      favorites: [...user.favorites, character],
    })
    await updateFavorites({
      data: {
        characters: [...user.favorites, character],
        user_id: user.user_id,
      },
      doc_id: user.id,
    }).catch((e) => {
      const getError = JSON.stringify(e)
      const error = JSON.parse(getError)
      if (error.code.match('invalid-argument')) {
        saveNewCollection({
          characters: [character],
          user_id: user.user_id,
        })
      } else {
        console.log(e)
      }
    })
  }
  const deleteFavorite: (name: string) => Promise<void> = async (
    name: string,
  ) => {
    const newFavs = user.favorites.filter((fav) => fav.name !== name)
    setUser({
      ...user,
      favorites: [...newFavs],
    })
    await updateFavorites({
      data: {
        characters: [...newFavs],
        user_id: user.user_id,
      },
      doc_id: user.id,
    })
  }

  const handleFavoriteButton = ({ name, data }: FavoriteButtonType) => {
    if (!user.user_id)
      return toast('¡Tienes que iniciar sesión para añadir favoritos', {
        icon: '⚠️',
      })
    if (isFavorite(name)) {
      deleteFavorite(name)
    } else {
      addFavorite(data)
    }
  }
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        characters,
        setCharacters,
        filterFavorites,
        locations,
        setLocations,
        addFavorite,
        isFavorite,
        deleteFavorite,
        handleFavoriteButton,
        setLoading,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default Provider
