import React, { useContext } from 'react'
import { UserContext } from 'src/context'
import { checkIfExists, login, register } from 'src/services/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Form: React.FC = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (user.password !== undefined && user?.password?.length < 7) {
        return toast.error('La contraseña debe tener 7 dígitos mínimo')
      }
      user.email !== undefined &&
        (await checkIfExists(user.email).then((i) => {
          console.log(i.length)
          if (i.length === 0) {
            register({
              email: user.email,
              password: user.password,
            })
              .then((u) => setUser({ ...user, user_id: u.user.uid }))
              .catch(() => toast.error('Algo ha salido mal, intenta más tarde'))
          } else {
            login({
              email: user?.email,
              password: user?.password,
            })
              .then((u) => {
                setUser({ ...user, user_id: u.user.uid })
                navigate('/', { replace: true })
              })
              .catch((error) => {
                console.log(error)
                const getCode = JSON.stringify(error)
                const parseCode = JSON.parse(getCode)
                if (parseCode.code.match('auth/wrong-password')) {
                  toast.error('Contraseña incorrrecta')
                } else {
                  toast.error('Algo ha salido mal, intenta más tarde')
                }
              })
          }
        }))
    } catch (error) {
      toast.error('Algo ha salido mal, intenta más tarde')
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <form
        className='flex flex-col justify-between gap-4 p-4 border rounded-md h-72 w-72 md:w-96'
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
            placeholder='alguien@gmail.com'
            required
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
            placeholder='********'
            required
            min={7}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type='password'
          />
        </div>
        <button
          type='submit'
          className='w-24 p-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:bg-blue-500/70 align-self-center'
          disabled={user.email === '' || user.password === ''}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Form
