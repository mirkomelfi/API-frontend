import React from "react";
import "./EdificioListContainer.css";
import { useState, useEffect } from "react";
import {EdificioList} from "../EdificioList/EdificioList"
import {useParams,Link} from "react-router-dom";
import { getToken } from "../../utils/auth-utils";


export const EdificioListContainer = ({greeting}) =>{

    const [listaEdificios,setListaEdificios]= useState([]);
    const [loading,setLoading]= useState(true);
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/edificios`

      useEffect(() => { 
        const token= getToken()
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          credentials:"include" 

        })
          .then(response => response.json())
          .then(data => {
              setListaEdificios(data)

          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[])

    return (
      <div>
        <h1 className="greeting">{greeting}</h1>
        {loading ? <p>cargando...</p> : <EdificioList listaEdificios={listaEdificios}/>}
        <Link to={`/`}>Volver</Link>
      </div>
   
    );
  }
  
