import React from "react";
import { Navigate, useParams} from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const ImagenPost = () =>{ 

    const {id}= useParams();

    const url=""

    /*fetchImagen= () =>{ 
    
    }

    useEffect(() => { 
        
    },[])
*/
    const [mensaje,setMensaje]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const imagen = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple


        let img=new FormData();
        img.append("archivo",imagen.imagen)

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: img
        })

        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login")
            
        }else{
            const data = await response.json()
            setRol(isRolUser(getToken()))
            console.log(rol)
            if(data.msj){
                setMensaje(data.msj)
            }
        }
            
        e.target.reset() //Reset form
            
        }
        
        useEffect(()=>{
            setRol(isRolUser(getToken()))
        },[])


    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cargado de Imagen</h2>
                    <form onSubmit={consultarForm} ref={datForm}>
                        
                        <div className="mb-3">
                            <label htmlFor="imagen" className="form-label">Imagen</label>
                            <input type="file" className="form-control" name="imagen" required />
                        </div>

                        <button type="submit"  class="button btnPrimary">Crear</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        {rol?<button class="button btnPrimary" onClick={()=>navigateTo(`/usuario/reclamos/${id}`)}><span class="btnText">Volver</span></button>
            :<button class="button btnPrimary" onClick={()=>navigateTo(`/reclamos`)}><span class="btnText">Volver</span></button>
            }
        </div>
        
    )
}
  
export default ImagenPost;