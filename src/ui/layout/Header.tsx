import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from 'src/context'
import { logout } from 'src/services/auth'
import HeaderMenu from '../components/Menu'

const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext)
  const location = useLocation()
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
      setUser({
        email: '',
        password: '',
        id: '',
        user_id: '',
        favorites: [],
      })
      return await logout()
    }
  }

  const menu = [
    {
      to: '/',
      text: 'Inicio',
      style: `${location.pathname === '/' && 'text-blue-500'} cursor-pointer hover:text-blue-500`,
    },
    {
      to: '/ubications',
      text: 'Ubicaciones',
      style: `${location.pathname === '/ubications' && 'text-blue-500'} cursor-pointer hover:text-blue-500`,
    },
    {
      to: '/favorites',
      text: 'Favoritos',
      style: `${location.pathname === '/favorites' && 'text-blue-500'} cursor-pointer hover:text-blue-500`,
    },
  ]
  return (
    <header className='flex items-center justify-between w-full px-6 py-8 max-w-'>
      <div className='flex md:hidden'>
        <HeaderMenu menu={menu} />
      </div>
      <div className='justify-between hidden gap-6 md:flex'>
        {menu.map((section, index) => (
          <NavLink key={index} to={section.to} className={section.style}>
            {section.text}
          </NavLink>
        ))}
      </div>
      <button
        className={`px-4 py-2 border rounded-lg ${!user?.user_id ? 'bg-blue-500 text-white' : 'text-black bg-white'}`}
      >
        <NavLink onClick={handleSession} to={user?.user_id ? '/' : '/login'}>
          {user?.user_id !== '' ? 'Cerrar sesión' : 'Inicio de sesión'}
        </NavLink>
      </button>
    </header>
  )
}

export default Header
