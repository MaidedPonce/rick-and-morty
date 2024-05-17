/* eslint-disable no-unused-vars */
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { Character, FavoriteButtonType, LocationType, UserType } from '../types'
import {
  getDocId,
  getFavorites,
  saveNewCollection,
  updateFavorites,
} from 'src/services/db'

interface UserContextType {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  characters: Character[]
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
  filterFavorites: () => Promise<void>
  locations: any
  setLocations: React.Dispatch<React.SetStateAction<any[]>>
  addFavorite: (character: Character | LocationType) => Promise<void>
  isFavorite: (fav: string) => void
  deleteFavorite: (fav: string) => void
  handleFavoriteButton: ({ name, data }: FavoriteButtonType) => void
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

  const [characters, setCharacters] = useState<Character[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const filterFavorites = async () => {
    const doc = await getFavorites(user.user_id)
    const char = doc?.characters || []
    console.log(char)
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
      console.log(docs)
      setUser({ ...user, id: docs || '' })
    })()
  }, [user.user_id, user.favorites, user.email])
  console.log(user)
  const isFavorite = (fav: string) => {
    const verifyId = user.favorites.map((favs) => favs.name)
    return verifyId.includes(fav)
  }

  const addFavorite: (
    character: Character | LocationType,
  ) => Promise<void> = async (character: Character | LocationType) => {
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
        console.log(user.favorites)
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default Provider
