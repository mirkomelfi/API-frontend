import "./Unidad.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { UnidadResponsable } from "./UnidadResponsable";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const Unidad =()=>{
    const {id}= useParams();

    const [unidad,setUnidad]= useState([]);
    console.log(unidad)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [updateResponsable,setUpdateResponsable]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }
    const cambiarPropietario=()=>{
        setUpdateResponsable("propietario")
        return;
    }

    const cambiarInquilino=()=>{
        setUpdateResponsable("inquilino")
        return;
    }

    const ejecutarFetch=async () =>{ 
    
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/unidades/${id}`, {
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
                setUnidad(data)
            }
        }
    }



    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/unidades/${id}`, {
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


    useEffect(() => { 
        ejecutarFetch()
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
      },[])


    return(
        <>
            {!updateResponsable?<div className="tarjetaProducto">
                <h1>Unidad N°{unidad.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {unidad.nombre}</h2>
                <h2>piso {unidad.piso}</h2>
                <h2>numero {unidad.numero}</h2>
                <h2>estado {unidad.estado}</h2>
                {unidad.propietario&&
                <>
                    <h2>propietario:</h2>
                    <h3>dni {unidad.propietario.dni}</h3>
                    <h3>nombre: {unidad.propietario.nombre}</h3>
                    <h3>apellido: {unidad.propietario.apellido}</h3>
                </>
                }
                {unidad.inquilino&&
                <>
                   <h2>inquilino:</h2>
                    <h3>dni {unidad.inquilino.dni}</h3>
                    <h3>nombre: {unidad.inquilino.nombre}</h3>
                    <h3>apellido: {unidad.inquilino.apellido}</h3>
                </>
                } 
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUnidad/${id}`)}><span class="btnText">Modificar</span></button>
                <button onClick={()=>cambiarPropietario()} className="btn btn-primary"><span class="btnText">Cambiar propietario</span></button>
                <button onClick={()=>cambiarInquilino()} className="btn btn-primary"><span class="btnText">Cambiar inquilino</span></button>
                <button onClick={()=>eliminar()} className="btn btn-primary"><span class="btnText">Eliminar</span></button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>:<UnidadResponsable responsable={updateResponsable} />}
            <button class="button btnPrimary" onClick={()=>navigateTo(`/edificios/${unidad.idEdificio}/unidades`)}><span class="btnText">Volver</span></button>
        </>
    )
}

export {Unidad}