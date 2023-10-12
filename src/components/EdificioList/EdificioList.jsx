import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";

const EdificioList = ({listaEdificios})=>{
    console.log(listaEdificios)
    return (
        <div className="contenedorProductos">
            {listaEdificios.map(edificio => <Edificio key={edificio.id} edificio={edificio}/>)}
        </div>
    )
}
export  {EdificioList}