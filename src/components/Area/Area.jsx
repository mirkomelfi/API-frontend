import "./Area.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
const Area =()=>{
    const {id}= useParams();

    const [area,setArea]= useState([]);
    console.log(area)
    const [loading,setLoading]= useState(true);

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/areas/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setArea(data)
          console.log(area)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Area N°{area.id}</h1>
                <h2>Nombre: {area.nombre}</h2>
                <h2>Nombre: {area.descripcion}</h2>
                <h2>piso {area.piso}</h2>
            </div>
        </>
    )
}

export {Area}