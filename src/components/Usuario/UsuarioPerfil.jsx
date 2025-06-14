import "./Usuario.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const UsuarioPerfil = () => {
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState, clearAuthData } = useUser();

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/usuarios/miperfil`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setUsuario(data);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      setMensaje("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (url) => navigate(url);

  useEffect(() => {
    ejecutarFetch();
  }, [tokenState]);

  return (
    <>
      <h1>Mi perfil</h1>
      {!mensaje ? (
        <div className="tarjetaProducto">
          <h1>DNI: {usuario.dni}</h1>
          <h2>Username: {usuario.username}</h2>
          <h2>Nombre: {usuario.nombre}</h2>
          <h2>Apellido: {usuario.apellido}</h2>
          <button className="button btnPrimary" onClick={() => navigateTo(`/updateUsuario`)}>
            <span className="btnText">Modificar</span>
          </button>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button className="button btnPrimary" onClick={() => navigateTo(`/`)}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export { UsuarioPerfil };
