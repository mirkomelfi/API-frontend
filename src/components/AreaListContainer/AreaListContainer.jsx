import React from "react";
import { useState, useEffect } from "react";
import {useParams,Link} from "react-router-dom";
import { AreaList } from "../AreaList/AreaList";
import { getToken } from "../../utils/auth-utils";
import { AreaPost } from "../Area/AreaPOST";


import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const AreaListContainer = ({greeting}) =>{

    const {id}= useParams();
    const [mensaje,setMensaje]=useState(null)
    const [listaAreas,setListaAreas]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }


    const agregar= () =>{ 
      setAdd(true)
    }


    const ejecutarFetch=async () =>{ 
    
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/edificios/${id}`, {
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
            const areas= data.areasComunes
            setListaAreas(areas)
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



    return (
        <>
          {loading 
          ? 
          <p>Cargando...</p> 
          : 
          !mensaje?
          !add ?
          (<>
            <h1 className="greeting">{greeting}</h1>
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar Area comun</button>
            <AreaList pid={id} listaAreas={listaAreas}/>
          </>)
          :
          (<AreaPost/>)
          : <Mensaje msj={mensaje} />
          }
           <Link to={`/edificios`}>Volver</Link>

        </>
    );
  } 
  
export default AreaListContainer;