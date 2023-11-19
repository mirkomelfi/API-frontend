import "./Reclamo.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "./ReclamoPOST";

import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const ReclamoUser =()=>{
    const {id}= useParams();

    const [reclamo,setReclamo]= useState([]);
    console.log(reclamo)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
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

            (<div className="tarjetaProducto">
               <h1>Reclamo N°{reclamo.id}</h1>
                <h2>Id del Edificio: {reclamo.idEdificio}</h2>
                <h2>Tipo de reclamable: {reclamo.tipoReclamable}</h2>
                <h2>Id del Reclamable: {reclamo.idReclamable}</h2>

                <h2>DNI del usuario: {reclamo.dniUsuario}</h2>
                <h2>Fecha de inicio: {reclamo.fechaDeInicio}</h2>
                
                <h2>Descripcion: {reclamo.descripcion}</h2>
                <h2>Estado: {reclamo.estado}</h2>

                <button class="button btnPrimary" onClick={()=>navigateTo(`/addImage/${id}`)}><span class="btnText">Agregar imagen</span></button>
                <button class="button btnPrimary" onClick={()=>navigateTo(`/verImagenes/${id}`)}><span class="btnText">Ver imagenes</span></button>
            </div>)
            :
            (<Mensaje msj={mensaje} />)
        }
            <button class="button btnPrimary" onClick={()=>navigateTo(`/usuario/reclamos`)}><span class="btnText">Volver</span></button>
        </>
    )
}

export {ReclamoUser}