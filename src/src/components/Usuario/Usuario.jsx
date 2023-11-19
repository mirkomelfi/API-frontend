import "./Usuario.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const Usuario =()=>{
    const {dni}= useParams();
    console.log("Usuariodni",dni)
    const [usuario,setUsuario]= useState([]);
    console.log(usuario)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    
    const [rol,setRol]=useState(undefined);

    const navigate=useNavigate()

    const ejecutarFetch=async () =>{ 
    
        var url=``;
        if (dni){
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`
        }else{
            url=`${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`
        }

        const response= await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        
        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login" )
            
        }else{
            const data = await response.json()
            setRol(isRolUser(getToken()))
            if(data.msj){
                setMensaje(data.msj)
            }else{
                setUsuario(data)
            }
        }
    }


    const eliminar=async()=>{
        console.log(dni)
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`, {
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
        return;
        
    }

    const navigateTo=(url)=>{
        navigate(url)
      }

    useEffect(() => { 
        ejecutarFetch()
        .catch(error => console.error(error))
        .finally(()=>{
        })
    },[])

    return(
        <>
            {!mensaje?(<div className="tarjetaProducto">
            <h1>DNI: {usuario.dni}</h1>
                <h2>Username: {usuario.username}</h2>
                <h2>Nombre: {usuario.nombre}</h2>
                <h2>Apellido: {usuario.apellido}</h2>
                {dni?
                 <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUsuario/${dni}`)}><span class="btnText">Modificar</span></button>
                :
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUsuario`)}><span class="btnText">Modificar</span></button>
                }
                {dni&&<button class="button btnPrimary" onClick={()=>eliminar()}><span class="btnText">Eliminar</span></button>}
            </div>):(<Mensaje msj={mensaje} />)}
            {dni?
             <button class="button btnPrimary" onClick={()=>navigateTo(`/usuarios`)}><span class="btnText">Volver</span></button>
            
            :
            <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
          
            }
        </>
    )
}

export {Usuario}