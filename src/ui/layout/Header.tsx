import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from 'src/context'
import { logout } from 'src/services/auth'

const Header = () => {
  const { user, setUser } = useContext(UserContext)
  const handleSession = async () => {
    try {
      if (user?.user_id) {
        setUser({
          email: '',
          password: '',
          id: '',
          user_id: '',
          favorites: [],
        })
        return await logout()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='flex items-center justify-between w-full px-6 py-8'>
      <div className='flex justify-between gap-6'>
        <NavLink to={'/'} className='cursor-pointer'>
          Inicio
        </NavLink>
        <NavLink to={'/ubications'} className='cursor-pointer'>
          Ubicaciones
        </NavLink>
        <NavLink to={'/favorites'} className='cursor-pointer'>
          Favoritos
        </NavLink>
      </div>
      <button className='px-4 py-2 border rounded-lg '>
        <NavLink onClick={handleSession} to={user?.user_id ? '/' : '/login'}>
          {user?.user_id !== '' ? 'Cerrar sesión' : 'Inicio de sesión'}
        </NavLink>
      </button>
    </header>
  )
}

export default Header
