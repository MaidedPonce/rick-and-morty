import React, { useContext } from 'react'
import { UserContext } from '../../context'
import { login, register } from 'src/services/auth'
import { useNavigate } from 'react-router-dom'

const Form = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await register({
        email: user.email,
        password: user.password,
      })
        .then((u) => setUser({ ...user, user_id: u.user.uid }))
        .catch(() => {
          navigate('/', { replace: true })
        })
    } catch (error) {
      const getCode = JSON.stringify(error)
      const parseCode = JSON.parse(getCode)
      if (parseCode.code.match('auth/email-already-in-use')) {
        await login({
          email: user?.email,
          password: user?.password,
        })
          .then((u) => setUser({ ...user, user_id: u.user.uid }))
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <form
        className='flex flex-col justify-between gap-4 p-4 border rounded-md h-72 w-96'
        onSubmit={handleLogin}
      >
        <div className='flex flex-col'>
          <label className='font-semibold' htmlFor='email'>
            Correo
          </label>
          <input
            id='email'
            onChange={(e) => setUser({ ...user, email: e.target.value.trim() })}
            type='email'
            className='w-full px-2 py-2 border rounded-md outline-none appearance-none focus:ring-blue-500 focus:ring-2 active:ring-blue-500 active:ring-2 peer'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold' htmlFor='password'>
            Password
          </label>
          <input
            className='w-full px-2 py-2 border rounded-md outline-none appearance-none focus:ring-blue-500 focus:ring-2 active:ring-blue-500 active:ring-2 peer'
            id='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type='password'
          />
        </div>
        <button
          type='submit'
          className='w-24 p-2 text-white bg-blue-500 rounded-md align-self-center'
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Form
