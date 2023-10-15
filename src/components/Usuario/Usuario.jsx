import "./Usuario.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Usuario =()=>{
    const {dni}= useParams();
    console.log("Usuariodni",dni)
    const [usuario,setUsuario]= useState([]);
    console.log(usuario)
    const [loading,setLoading]= useState(true);


    const [mensaje,setMensaje]=useState(null)

    const modificar=async()=>{

    }

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/usuarios/${dni}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        const data = await response.json()
        console.log(data)
        if (response.status==200){
          setMensaje(data.msj)
          return;
        }
  
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/usuarios/${dni}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setUsuario(data)
          console.log(usuario)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            {!mensaje?(<div className="tarjetaProducto">
            <h1>DNI: {usuario.dni}</h1>
                <h2>Nombre de usuario: {usuario.username}</h2>
                <h2>Nombre: {usuario.nombre}</h2>
                <h2>Apellido: {usuario.apellido}</h2>
                <Link to={`/updateUsuario/${dni}`}>Modificar</Link>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
            </div>):(<Mensaje msj={mensaje} />)}
            <Link to={`/usuarios`}>Volver</Link>
        </>
    )
}

export {Usuario}