import "./Area.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const AreaUser =()=>{
    const {id}= useParams();

    const [area,setArea]= useState([]);
    console.log(area)
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
    
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/areas/${id}`, {
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
                setArea(data)
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
                <h1>Area N°{area.id}</h1>
                <h2>Nombre: {area.nombre}</h2>
                <h2>Piso: {area.piso}</h2>
                <h2>Descripcion: {area.descripcion}</h2>
                <button onClick={()=>generarReclamo()} className="button btnPrimary"><span class="btnText">Generar reclamo</span></button>
                
            </div>)
            :
            (<ReclamoPost isUnit={false} />)
        }
            <button class="button btnPrimary" onClick={()=>navigateTo(`/usuario/areas`)}><span class="btnText">Volver</span></button>

        </>
    )
}

export {AreaUser}