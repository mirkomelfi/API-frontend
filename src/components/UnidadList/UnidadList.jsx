import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { UnidadDetail } from "../UnidadDetail/UnidadDetail";
import { Link } from "react-router-dom";

const UnidadList = ({listaUnidades, isAdmin})=>{
    console.log("unidadlist",listaUnidades)
    console.log("UnidadList",isAdmin)
    return (
        <>
           {listaUnidades&&
           
            <div className="contenedorProductos">
                {listaUnidades.map(unidad => <UnidadDetail key={unidad.id} unidad={unidad} isAdmin />)}
            </div>
            }
        </>
    )
}
export  {UnidadList}