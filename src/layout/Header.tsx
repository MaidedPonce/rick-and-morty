import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center justify-between w-full px-6 py-8'>
      <div className='flex justify-between gap-6'>
        <span className='cursor-pointer'>Inicio</span>
        <span className='cursor-pointer'>Ubicaciones</span>
        <span className='cursor-pointer'>Favoritos</span>
      </div>
      <button className='px-4 py-2 border rounded-lg '>Inicio de sesión</button>
    </header>
  )
}

export default Header
