import "./UsuarioDetail.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
const UsuarioDetail =({usuario})=>{
    console.log("vUsuarioDetail",usuario)

    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }


    return(
        <>
            <div className="tarjetaProducto">
                <h1>DNI: {usuario.dni}</h1>
                <h2>Apellido: {usuario.apellido}</h2>
                <button class="button btnPrimary" onClick={()=>navigateTo(`${usuario.dni}`)}><span class="btnText">Ver usuario</span></button>

            </div>
        </>
    )
}

export {UsuarioDetail}