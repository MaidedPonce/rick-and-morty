import { ReactNode, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from 'src/context'
import { auth } from 'src/firebase/firebase.config'

const Auth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setUser, user: userProps } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user !== null) {
        return setUser({ ...userProps, user_id: user.uid })
      } else {
        setUser({ ...userProps, user_id: '' })
        if (location.pathname === '/favorites') {
          return navigate('/login')
        }
      }
    })
  }, [location.pathname])
  return <div className='max-w-5xl m-auto'>{children}</div>
}

export default Auth
