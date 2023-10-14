import "./Reclamo.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";

const Reclamo =()=>{
    const {id}= useParams();
    const [reclamo,setReclamo]= useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setReclamo(data)
          console.log(reclamo)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Reclamo N°{reclamo.id}</h1>
                <h2>Id del Edificio: {reclamo.idEdificio}</h2>
                <h2>Tipo: {reclamo.tipoReclamable}</h2>
                <h2>Id del Reclamable: {reclamo.idReclamable}</h2>

                <h2>Autor del Reclamo: {reclamo.dniUsuario}</h2>
                <h2>Se inicio: {reclamo.fechaDeInicio}</h2>
                
                <h2>Descripcion: {reclamo.descripcion}</h2>
            </div>
            <Link to={`/reclamos`}>Volver</Link>
        </>
    )
}

export {Reclamo}