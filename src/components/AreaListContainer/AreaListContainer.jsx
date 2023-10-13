import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
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
          console.log(data)
          const areas= data.areas
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
        </>
    );
  } 
  
export default AreaListContainer;