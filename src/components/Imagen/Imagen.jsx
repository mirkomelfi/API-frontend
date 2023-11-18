
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const Imagen =()=>{
    const {id}= useParams();
    const [imagen,setImagen]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [bytes,setBytes]=useState(null)
    let [num,setNum]=useState(1)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const siguienteImg=()=>{
      setNum(num+1)

  }

  const eliminarImg=async()=>{
    
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
        method: "DELETE",
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
            }
        }

  }


  const ejecutarFetch=async () =>{ 
    
      const response= await  fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
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
            setBytes(data.datosImagen)
          }
      }
    }

    useEffect(() => { 
    ejecutarFetch()
    .catch(error => console.error(error))
    .finally(()=>{
      setLoading(false)
    })
    },[num])

    return( 
        <>
            {!mensaje? <>
            (<div className="tarjetaProducto">
                <h1>Imagen N°{num}</h1>
                <img src={`data:image/jpeg;base64,${bytes}`} alt="" />
                <button onClick={()=>eliminarImg()} className="btn btn-primary"><span class="btnText">Eliminar imagen</span></button>
            </div>
            <>
            <button onClick={()=>siguienteImg()} className="btn btn-primary"><span class="btnText">Siguiente imagen</span></button>
            </>)</>
            
            :<Mensaje msj={mensaje} />
            }
            <button class="button btnPrimary" onClick={()=>navigateTo(`/reclamos`)}><span class="btnText">Volver</span></button>
           
        </>
    )
}

export {Imagen}