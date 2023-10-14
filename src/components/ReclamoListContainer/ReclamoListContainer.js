import React from "react";
import "./ReclamoListContainer.css";
import { useState, useEffect } from "react";
import {ReclamoList} from "../ReclamoList/ReclamoList"
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";


export const ReclamoListContainer = ({greeting}) =>{

    const [listaReclamos,setListaReclamos]= useState([]);
    const [loading,setLoading]= useState(true);
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/reclamos`

      useEffect(() => { 
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`
          }

        })
          .then(response => response.json())
          .then(data => {
              setListaReclamos(data)

          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[])

    return (
      <div>
        <h1 className="greeting">{greeting}</h1>
        {loading ? <p>cargando...</p> : <ReclamoList listaReclamos={listaReclamos}/>}
        <Link to={`/`}>Volver</Link> 
      </div>
   
    );
  }
  
