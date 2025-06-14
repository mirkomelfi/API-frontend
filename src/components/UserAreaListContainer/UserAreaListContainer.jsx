import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AreaList } from "../AreaList/AreaList";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const UserAreaListContainer = ({ greeting }) => {
  const [listaAreas, setListaAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const { tokenState } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const ejecutarFetch = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/misAreas`, {
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
          setListaAreas(data);
        }
      } catch (error) {
        console.error("Error al cargar áreas:", error);
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
          <AreaList listaAreas={listaAreas} />
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

export default UserAreaListContainer;
