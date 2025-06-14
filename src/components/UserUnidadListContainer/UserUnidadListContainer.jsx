import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnidadList } from "../UnidadList/UnidadList";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const UserUnidadListContainer = ({ greeting }) => {
  const [listaUnidades, setListaUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState } = useUser();

  useEffect(() => {
    const ejecutarFetch = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/misUnidades`, {
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
          setListaUnidades(data);
        }
      } catch (error) {
        console.error("Error al cargar unidades:", error);
        setMensaje("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    ejecutarFetch();
  }, [tokenState]);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : !mensaje ? (
        <>
          <h1 className="greeting">{greeting}</h1>
          <UnidadList listaUnidades={listaUnidades} />
        </>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button className="button btnPrimary" onClick={() => navigate("/")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export default UserUnidadListContainer;
