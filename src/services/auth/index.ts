import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from 'src/firebase/firebase.config'
import { LoginProps } from 'src/types'

const login = async ({ email = '', password = '' }: LoginProps) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
  return res
}

const register = async ({ email = '', password = '' }: LoginProps): Promise<UserCredential> => {
  const res = await createUserWithEmailAndPassword(auth, email, password)
  return res
}

const logout = async () => {
  await signOut(auth)
}

export { login, register, logout }
