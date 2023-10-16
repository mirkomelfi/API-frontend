import React from "react";
import { Link } from "react-router-dom";
export const Home = () =>{

    return (
      <>
        <Link to={`usuario/current`}>Mi perfil</Link> 
        <Link to={`usuario/unidades`}>Mis unidades</Link> 
        <Link to={`usuario/areas`}>Mis areas</Link> 
      </>
    );
  }
  