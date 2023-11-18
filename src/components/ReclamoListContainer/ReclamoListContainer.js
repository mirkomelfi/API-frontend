import React from "react";
import "./ReclamoListContainer.css";
import { useState, useEffect } from "react";
import {ReclamoList} from "../ReclamoList/ReclamoList"
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import {useNavigate, useParams} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

export const ReclamoListContainer = ({greeting}) =>{

  const {estado}= useParams();

    const [listaReclamos,setListaReclamos]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    let url="";
    
    const navigate= useNavigate()

    const ejecutarFetch = async() =>{
      if (estado){
        url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/filter?estado=${estado}`
      }else{
        url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos`
      }


      const response= await  fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }

      })
      const rol=validateRol(response)
      if (!rol){
        if (isRolUser(getToken())){
          console.log("rol user")
            setMensaje("No posee los permisos necesarios")
        }else{
          deleteToken()
          navigate("/login")
        }
      }else{
      const data = await response.json()
      if (data.msj){
        setMensaje(data.msj)
      }else{
        setListaReclamos(data)
        setMensaje(null)
      }
      }
    }
  
    const navigateTo=(url)=>{
      navigate(url)
    }
  
    useEffect(() => { 
      ejecutarFetch()
      .catch(error => console.error(error))
      .finally(()=>{
        setLoading(false)
      })
    },[])



    

    return (
      <>
      <button class="button btnPrimary" onClick={()=>navigateTo(`/filtrarReclamos`)}><span class="btnText">Filtrar segun estado</span></button>
      <h1 className="greeting">{greeting}</h1>
      {!mensaje?(
      <div>
        {loading ? <p>cargando...</p> : <ReclamoList listaReclamos={listaReclamos}/>}
      </div>):<Mensaje msj={mensaje}/>}
      <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
    </>
    );
  }