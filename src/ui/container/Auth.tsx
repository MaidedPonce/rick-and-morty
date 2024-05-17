import { ReactNode, useContext, useEffect } from 'react'
import { UserContext } from 'src/context'
import { auth } from 'src/firebase/firebase.config'

const Auth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setUser, user: userProps } = useContext(UserContext)

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        return setUser({ ...userProps, user_id: user.uid })
      } else {
        setUser({ ...userProps, user_id: '' })
      }
    })
  }, [])
  return <div className='max-w-5xl m-auto'>{children}</div>
}

export default Auth
