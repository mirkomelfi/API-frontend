import React from "react";
import { useState, useEffect } from "react";
import {useParams,Link} from "react-router-dom";
import { AreaList } from "../AreaList/AreaList";


const AreaListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaAreas,setListaAreas]= useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/edificios/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
      })
        .then(response => response.json())
        .then(data => {
          const areas= data.areasComunes
          setListaAreas(areas)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <>
          <h1 className="greeting">{greeting}</h1>
          {loading ? <p>Cargando...</p> : <AreaList pid={id} listaAreas={listaAreas}/>}
          <Link to={`/edificios`}>Volver</Link>
        </>
    );
  } 
  
export default AreaListContainer;