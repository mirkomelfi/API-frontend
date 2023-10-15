import "./Edificio.css";
import {Link} from "react-router-dom";

const Edificio =({edificio})=>{
    console.log(edificio)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Edificio N°{edificio.id}</h1>
                <h2>Calle: {edificio.calle}</h2>
                <h2>Numero: {edificio.numero}</h2>
                <h2>Ciudad: {edificio.ciudad}</h2>
                <h2>Codigo postal: {edificio.codPostal}</h2>
                <Link to={`${edificio.id}/unidades`}>Ver unidades</Link> 
                <Link to={`${edificio.id}/areas`}>Ver areas</Link> 
                <Link to={``}>Modificar edificio</Link> 
                <Link to={``}>Eliminar edificio</Link> 
                
            </div>
        </>
    )
}

export {Edificio}