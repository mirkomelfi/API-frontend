import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { UnidadDetail } from "../UnidadDetail/UnidadDetail";
import { Link } from "react-router-dom";

const UnidadList = ({listaUnidades})=>{
    console.log("unidadlist",listaUnidades)
    return (
        <>
            <Link to={``}>Agregar Unidad</Link> 
           {listaUnidades&&
           
            <div className="contenedorProductos">
                {listaUnidades.map(unidad => <UnidadDetail key={unidad.id} unidad={unidad}/>)}
            </div>
            }
        </>
    )
}
export  {UnidadList}