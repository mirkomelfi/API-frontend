import "./Unidad.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";

import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const UnidadUser =()=>{
    const {id}= useParams();

    const [unidad,setUnidad]= useState([]);
    console.log(unidad)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [add,setAdd]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

     const generarReclamo= ()=>{
        setAdd(true)
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

    useEffect(() => { 
      ejecutarFetch()
      .catch(error => console.error(error))
      .finally(()=>{
        setLoading(false)
      })
    },[])

   
    return(
        <>
        {!add?

            (<div className="tarjetaProducto">
                <h1>Unidad N°{unidad.id}</h1>
                <h2>Nombre: {unidad.nombre}</h2>
                <h2>piso {unidad.piso}</h2>
                <h2>numero {unidad.numero}</h2>
                <h2>estado {unidad.estado}</h2>
                <button onClick={()=>generarReclamo()} className="btn btn-primary">Generar reclamo</button>
                
            </div>)
            :
            (<ReclamoPost isUnit={true} />)
        }
            <Link to={`/usuario/unidades`}>Volver</Link>
        </>
    )
}

export {UnidadUser}