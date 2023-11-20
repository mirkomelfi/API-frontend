import React from "react";
//import logo from "../../assets/logo1.jpg"
//import { CartWidget } from "../CartWidget/CartWidget";
import {Link} from "react-router-dom";
import "./Navbar.css"

const Navbar = () =>{
    return (
        <header>
            <Link to="/logout">Logout</Link>
            <Link to="/"><h1>Sistema de Reclamos</h1></Link>
            <Link to="/login">Login</Link>
            
        </header>
    );
  }
  
  export default Navbar;
  