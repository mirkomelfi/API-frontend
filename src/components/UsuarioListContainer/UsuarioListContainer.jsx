import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UsuarioList } from "../UsuarioList/UsuarioList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";


const UsuarioListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaUsuarios,setListaUsuarios]= useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setListaUsuarios(data)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <>
          <h1 className="greeting">{greeting}</h1>
          {loading ? <p>Cargando...</p> : <UsuarioList pid={id} listaUsuarios={listaUsuarios}/>}
          <Link to={`/`}>Volver</Link>
        </>
    );
  } 
  
export default UsuarioListContainer;