import React from "react";
import { Navigate} from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useState,useEffect } from "react";

import "./Cart.css";

const Cart = () =>{ 

    const [finalizada, setFinalizada] = useState(false);
    const [cart, setCart] = useState([]);

    const [ticket, setTicket] = useState(null);

    const fetchCart = async () => {
        try {
            let url = `${process.env.REACT_APP_DOMINIO_BACK}/api/carts/`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await response.json();

            if (data.status == 200) {

                setCart(data.cart.products);
            } else {
                console.log(data)

            }
        } catch (error) {

            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => { 
        fetchCart()
    },[])


    const removeItem=async(id)=>{
        let status=0
        await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/carts/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include"
            })
            .then(response => {
                status= response.status
                if (status == 200) {
                    fetchCart()
                } else {
                    console.error("error");
                }
            })
            .catch(error => console.error(error))

        return status
    }

    const finalizarCompra = async()=>{
        if (cart){
            await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/carts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:"",
            credentials:"include"
            })
            .then(response => response.json())
            .then(data => {

            setTicket(data.ticket_generado)
            setFinalizada(true)
            })
            .catch(error => console.error(error))
        }
    }
    
    return (
        <>
            <h3>Carrito</h3>
            {cart?(!finalizada?(cart.map(producto=>
            
                <div key= {producto.productId._id} className="producto">
                    <h1>{producto.productId.title}</h1>
                    <p>Cantidad: {producto.quantity}</p>
                    <p>Precio unitario: ${producto.productId.price}</p>
                    <button onClick={()=>removeItem(producto.productId._id)}>Quitar del carrito</button>
                </div>
                
                )
                )
                :

                <div className="ticket">
                    <h1>Codigo de ticket: {ticket.code}</h1>
                    <p>Total: ${ticket.amount}</p>

                </div>

                ):<><Mensaje msj={"Carrito vacio"} /></>}
            <>
            {!finalizada&&<button onClick={()=>finalizarCompra()}>finalizar Compra</button>}
            </>
        </>
    );
  } 
  
export default Cart;