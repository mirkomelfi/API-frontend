import React from "react";
import { Link } from "react-router-dom";
export const HomeAdmin = () =>{

    return (
      <>
        <Link to={`/reclamos`}>Reclamos</Link> 
        <Link to={`/edificios`}>Edificios</Link> 
        <Link to={`/usuarios`}>Usuarios</Link>
      </>
    );
  }
  