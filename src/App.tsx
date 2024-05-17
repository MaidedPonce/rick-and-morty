import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Provider from 'src/context'
import Header from 'src/ui/layout/Header'
import Auth from 'src/ui/container/Auth'
import { Toaster } from 'react-hot-toast'
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('src/ui/container/Home'))
const Login = React.lazy(() => import('src/ui/container/Login'))
const Favorites = React.lazy(() => import('src/ui/container/Favorites'))
const LocationsContainer = React.lazy(
  () => import('src/ui/container/LocationsContainer'),
)

function App() {
  return (
    <Provider>
      <Toaster />
      <Auth>
        <HashRouter>
          <Header />
          <Suspense
            fallback={
              <div className='flex items-center justify-center w-full h-full min-h-40'>
                Cargando...
              </div>
            }
          >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/ubications' element={<LocationsContainer />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </Auth>
    </Provider>
  )
}

export default App
