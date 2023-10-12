import {Item} from "../Item/Edificio"
import "../Item/Item.css";

const ItemList = ({listaEdificios})=>{
    console.log(listaEdificios)
    return (
        <div className="contenedorProductos">
            {listaEdificios.map(edificio => <Item key={edificio.id} edificio={edificio}/>)}
        </div>
    )
}
export  {ItemList}