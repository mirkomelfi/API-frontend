import React from "react";
import "./EdificioListContainer.css";
import { useState, useEffect } from "react";
import {EdificioList} from "../EdificioList/EdificioList"
import {useParams} from "react-router-dom";


export const EdificioListContainer = ({greeting}) =>{

    const [listaEdificios,setListaEdificios]= useState([]);
    const [loading,setLoading]= useState(true);
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/edificios`

      useEffect(() => { 
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }

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
      </div>
   
    );
  }
  
