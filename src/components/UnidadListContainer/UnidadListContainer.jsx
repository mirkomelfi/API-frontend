import React from "react";
import { useState, useEffect } from "react";
import {ItemDetail} from "../ItemDetail/ItemDetail"
import {useParams} from "react-router-dom";
import { UnidadList } from "../UnidadList/UnidadList";
import { Link } from "react-router-dom";


const UnidadListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaUnidades,setListaUnidades]= useState([]);
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
          const unidades= data.unidades
          setListaUnidades(unidades)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <>
          <h1 className="greeting">{greeting}</h1>
          {loading ? <p>Cargando...</p> : <UnidadList pid={id} listaUnidades={listaUnidades}/>}
          <Link to={`/edificios`}>Volver</Link>
        </>
    );
  } 
  
export default UnidadListContainer;