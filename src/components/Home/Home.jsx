import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,getToken,deleteToken } from "../../utils/auth-utils";
import { useState,useEffect } from "react";

export const Home = () =>{
  const [rolUser,setRolUser]=useState(true)
  const navigate=useNavigate()

const ejecutarFetch = async () =>{
  let url=`${process.env.REACT_APP_DOMINIO_BACK}/profile`
  const response= await  fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    }  
  })

  const rol=validateRol(response)
  if (!rol){
    navigate("/login")
  }else{
    setRolUser(isRolUser(getToken()))
  }

}
const navigateTo=(url)=>{
  navigate(url)
}
  useEffect(()=>{
    ejecutarFetch()
    .catch(error => console.error(error))
  },[])
    return (
      <>
      {!rolUser??
         <>
        
        <Link to={`reclamos`}>Reclamos</Link> 
        <Link to={`edificios`}>Edificios</Link> 
        <Link to={`usuarios`}>Usuarios</Link>
        <Link to={`usuario/current`}>Mi perfil</Link> 
       
: <Link to={`usuario/current`}>Mi perfil</Link> 
<Link to={`usuario/unidades`}>Mis unidades</Link> 
<Link to={`usuario/areas`}>Mis areas</Link> 
<Link to={`usuario/reclamos`}>Mis reclamos</Link> </>
        }
        
        
      </>
    );
  }
  