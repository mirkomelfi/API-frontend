import {ReclamoDetail} from "../ReclamoDetail/ReclamoDetail"
import "../ReclamoDetail/ReclamoDetail.css";

const ReclamoList = ({listaReclamos})=>{
    return (

        <div className="contenedorProductos">
            {listaReclamos.map(reclamo => <ReclamoDetail key={reclamo.id} reclamo={reclamo}/>)}
        </div>

    )
}
export  {ReclamoList}