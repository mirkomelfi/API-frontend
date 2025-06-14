import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UsuarioList } from "../UsuarioList/UsuarioList";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const UsuarioListContainer = ({ greeting }) => {
  const { id } = useParams();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState } = useUser(); 

  useEffect(() => {
    const ejecutarFetch = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios`, {
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
          setListaUsuarios(data);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setMensaje("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    ejecutarFetch();
  }, [tokenState]);

  const navigateTo = (url) => navigate(url);

  return (
    <>
      {!mensaje ? (
        <>
          <h1 className="greeting">{greeting}</h1>
          <button className="button btnPrimary" onClick={() => navigateTo(`/register`)}>
            <span className="btnText">Register</span>
          </button>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <UsuarioList pid={id} listaUsuarios={listaUsuarios} />
          )}
          <button className="button btnPrimary" onClick={() => navigateTo(`/`)}>
            <span className="btnText">Volver</span>
          </button>
        </>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </>
  );
};

export default UsuarioListContainer;
