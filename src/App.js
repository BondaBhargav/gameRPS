import './App.css'
import LoginForm from './components/LoginForm'
 import Home from './components/Home'
 import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectRouter from './components/ProtectRouter'
import Account from './components/Account'
import SearchItem from './components/SearchItem'
import NotFound from './components/NotFound'

import { Route, Routes} from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route  element={<ProtectRouter/>}>
            <Route  path="/" element={<Home/>}/>
            <Route  path="/popular" element={<Popular/>}/>
            <Route  path="/account" element={<Account/>}/>
            <Route  path="/movies/:id" element={<MovieItemDetails/>}/>
            <Route path="/search" element={<SearchItem/>}/>
          
      </Route>
   
      <Route  path="/login" element={<LoginForm/>}/>
      <Route element={<NotFound/>}/>
    </Routes>
  )
}
export default App
