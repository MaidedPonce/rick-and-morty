import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './ui/container/Home'
import Provider from './context'
import Header from './ui/layout/Header'
import Login from './ui/container/Login'
import Auth from './ui/container/Auth'
import Favorites from './ui/container/Favorites'
import LocationsContainer from './ui/container/LocationsContainer'

function App() {
  return (
    <Provider>
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
