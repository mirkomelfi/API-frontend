import "./UnidadDetail.css";
import {Link, useNavigate} from "react-router-dom";

const UnidadDetail =({unidad})=>{
    console.log(unidad)
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    return(
        <>
            <div className="tarjetaProducto">
                <h1>Unidad N°{unidad.id}</h1>
                <h2>Nombre: {unidad.nombre}</h2>
                <h2>Piso: {unidad.piso}</h2>
                <h2>Num: {unidad.numero}</h2>
                <button class="button btnPrimary" onClick={()=>navigateTo(`${unidad.id}`)}><span class="btnText">Ver unidad</span></button> 

            </div>
        </>
    )
}

export {UnidadDetail}