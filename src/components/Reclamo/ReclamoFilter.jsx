import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ReclamoListContainer } from "../ReclamoListContainer/ReclamoListContainer"


export const ReclamoFilter = () => {

    const [reclamos,setReclamos]= useState(null);

    const backToList = () =>{
        setReclamos(true)
      }

    return (
        <>
        {!reclamos?<>
            <DropdownButton id="dropdown-basic-button" title="Estado del reclamo">
            <Dropdown.Item href="#/action-1" >Nuevo</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Abierto</Dropdown.Item>
            <Dropdown.Item href="#/action-3">En proceso</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Anulado</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Desestimado</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Terminado</Dropdown.Item>
            </DropdownButton>
            <button class="button btnPrimary" onClick={()=>backToList()}><span class="btnText">Volver</span></button>
        </>:
        <ReclamoListContainer/>
        }
        </>
    );
      
}