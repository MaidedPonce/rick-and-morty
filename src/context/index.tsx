import React, { ReactNode, createContext, useState } from 'react'

const CreateContext = createContext({})

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setLogin] = useState()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [favorites, setFavorites] = useState([])

  return (
    <CreateContext.Provider
      value={{
        favorites,
        user,
      }}
    >
      {children}
    </CreateContext.Provider>
  )
}

export default Provider
