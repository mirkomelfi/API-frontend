import "./Area.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const Area =()=>{
    const {id}= useParams();

    const [area,setArea]= useState([]);
    console.log(area)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const modificar=async()=>{

    }
    
    const eliminar=async()=>{
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/areas/${id}`, {
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
    
    const response= await  fetch(`${process.env.REACT_APP_DOMINIO_BACK}/areas/${id}`, {
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
            <div className="tarjetaProducto">
                <h1>Area N°{area.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {area.nombre}</h2>
                <h2>Piso: {area.piso}</h2>
                <h2>Descripcion: {area.descripcion}</h2>
                <Link to={`/updateArea/${id}`}>Modificar</Link>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>
            <Link to={`/edificios/${area.idEdificio}/areas`}>Volver</Link>
        </>
    )
}

export {Area}