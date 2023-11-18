import "./Reclamo.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoEstado } from "./ReclamoEstado";

import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";
import { Medidas } from "../Medidas/Medidas";

const Reclamo =()=>{
    const {id}= useParams();
    const [reclamo,setReclamo]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [estado,setEstado]=useState(null)
    const [medidas,setMedidas]=useState(null)
    const [vistaMedidas,setVistaMedidas]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const cambiarEstado=()=>{
   setEstado(true)
  }
  const cambiarVistaMedidas=()=>{
    setVistaMedidas(true)
   }

    const eliminar=async()=>{
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/${id}`, {
          method: "DELETE",
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
      }
      }

  }

  const ejecutarFetch=async () =>{ 
    
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      }
      
    })
    
    const rol=validateRol(response)
    if (!rol){
        deleteToken()
        navigate("/login")
        
    }else{
        const data = await response.json()
        setRol(isRolUser(getToken()))
        if(data.msj){
            setMensaje(data.msj)
        }else{
          setReclamo(data)
          console.log(reclamo)
          console.log(data.medidas.length)
          if (data.medidas.length!=0){setMedidas(true)}
        }
    }
}

useEffect(() => { 
  ejecutarFetch()
  .catch(error => console.error(error))
  .finally(()=>{
    setLoading(false)
  })
},[])



    
    return( 
        <>
            {!mensaje?
            (!estado?
              (!vistaMedidas?
            (<div className="tarjetaProducto">
                <h1>Reclamo N°{reclamo.id}</h1>
                <h2>Id del Edificio: {reclamo.idEdificio}</h2>
                <h2>Tipo: {reclamo.tipoReclamable}</h2>
                <h2>Id del Reclamable: {reclamo.idReclamable}</h2>

                <h2>Autor del Reclamo: {reclamo.dniUsuario}</h2>
                <h2>Se inicio: {reclamo.fechaDeInicio}</h2>
                
                <h2>Descripcion: {reclamo.descripcion}</h2>
                <h2>Estado: {reclamo.estado}</h2>
                {medidas?<button onClick={()=>cambiarVistaMedidas()}  class="button btnPrimary">Ver Medidas</button>:<h2>Aun no hay medidas tomadas</h2>}
                <button class="button btnPrimary" onClick={()=>navigateTo(`/verImagenes/${id}`)}><span class="btnText">Ver imagenes</span></button>
                <button onClick={()=>cambiarEstado()}  class="button btnPrimary">Cambiar estado</button>
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateReclamo/${id}`)}><span class="btnText">Modificar</span></button>
                <button onClick={()=>eliminar()}  class="button btnPrimary">Eliminar</button>
                
            </div>)
            :<Medidas medidas={reclamo.medidas} />)
            
            :<ReclamoEstado />)
            
            :(<Mensaje msj={mensaje} />)
            }
            <button class="button btnPrimary" onClick={()=>navigateTo(`/reclamos`)}><span class="btnText">Volver</span></button>
        </>
    )
}

export {Reclamo}