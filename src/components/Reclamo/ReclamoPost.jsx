
import "./Reclamo.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const ReclamoPost =()=>{


    const modificar=async()=>{

  }



    return(  
        <>  
            <>
                <div className="container divForm" >
                    <h3>Formulario de Creacion/Modificacion Reclamo</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
        
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                            <input type="username" className="form-control" name="username" />
                        </div>
        
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" />
                        </div>
        
                        <button type="submit" className="btn btn-primary" >Iniciar Sesion</button>
                    </form>

                </div>
            </>

        </>
    )
}

export {ReclamoPost}

