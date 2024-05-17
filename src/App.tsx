import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'src/ui/container/Home'
import Provider from 'src/context'
import Header from 'src/ui/layout/Header'
import Login from 'src/ui/container/Login'
import Auth from 'src/ui/container/Auth'
import Favorites from 'src/ui/container/Favorites'
import LocationsContainer from 'src/ui/container/LocationsContainer'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Provider>
      <Toaster />
      <Auth>
        <HashRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/ubications' element={<LocationsContainer />} />
          </Routes>
        </HashRouter>
      </Auth>
    </Provider>
  )
}

export default App
