import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import {EdificioListContainer} from './EdificioListContainer/EdificioListContainer';
import Cart from './Cart/Cart';
import { CreacionUser } from './CreacionUser/CreacionUser';
import { UserPassword } from './UserPassword/UserPassword';
import { ChangePass } from './UserPassword/ChangePass';
import UnidadListContainer from './UnidadListContainer/UnidadListContainer';
import { Home } from './Home/Home';
import { Unidad } from './Unidad/Unidad';
import AreaListContainer from './AreaListContainer/AreaListContainer';
import { Area } from './Area/Area';


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
         <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path="/edificios" element={<EdificioListContainer greeting="Listado de Edificios"/>}/>
          <Route path="/edificios/:id/unidades" element={<UnidadListContainer greeting="Listado de Unidades del Edificio seleccionado"/>}/>
          <Route path="/edificios/:id/unidades/:id" element={<Unidad />}/> 
          <Route path="/edificios/:id/areas" element={<AreaListContainer greeting="Listado de Areas Comunes del Edificio seleccionado"/>}/>
          <Route path="/edificios/:id/areas/:id" element={<Area />}/> 
          <Route path="/cart" element={<Cart />}/> 
          <Route path="/admin" element={<CreacionUser />}/> 
          <Route path="/password"element={<UserPassword />}/> 
          <Route path="/newpassword"element={<ChangePass />}/> 
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}