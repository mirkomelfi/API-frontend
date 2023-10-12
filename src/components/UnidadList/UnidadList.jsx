import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { UnidadDetail } from "../UnidadDetail/UnidadDetail";

const UnidadList = ({listaUnidades})=>{
    console.log(listaUnidades)
    return (
        <div className="contenedorProductos">
            {listaUnidades.map(unidad => <UnidadDetail key={unidad.id} unidad={unidad}/>)}
        </div>
    )
}
export  {UnidadList}