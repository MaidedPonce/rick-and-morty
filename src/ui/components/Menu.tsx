import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { NavLink } from 'react-router-dom'

interface MenuProps {
  menu: {
    to: string
    text: string
    style: string
  }[]
}

const HeaderMenu: React.FC<MenuProps> = ({ menu }) => {
  return (
    <Menu>
      <MenuButton>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </MenuButton>
      <Transition
        enter='transition ease-out duration-75'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <MenuItems
          anchor='bottom end'
          className='w-52 left-[1.5rem!important] origin-top-right bg-white shadow-md rounded-xl p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none'
        >
          {menu.map((section) => (
            <MenuItem key={section.text}>
              <NavLink
                key={section.text}
                to={section.to}
                className={section.style}
              >
                <p className='m-4'>{section.text}</p>
              </NavLink>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default HeaderMenu
