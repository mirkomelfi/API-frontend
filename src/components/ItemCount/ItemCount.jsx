import React, {useState} from "react" 
import "./ItemCount.css";

const ItemCount = ({stock,onAdd}) =>{

    const [contador,setContador]= useState(1);

    const agregar =()=>{
        if (contador<stock){
            setContador(contador+1);
        }
    }
    const quitar =()=>{
        if (contador>1){
            setContador(contador-1)
        }
    }
    const devolver =()=>{
        onAdd(contador)
    }

    return (
        <div className="contenedorContador">
            <h3 className="atributo">Cantidad: {contador}</h3>
            <div className="botonesContador">
                <button onClick={agregar}>+</button>
                <button onClick={devolver}>Agregar al carrito</button>
                <button onClick={quitar}>-</button>
            </div>
        </div>
   
    );
  }
  
export default ItemCount;