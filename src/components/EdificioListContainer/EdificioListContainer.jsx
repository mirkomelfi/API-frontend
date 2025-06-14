import React, { useState, useEffect } from "react";
import { EdificioList } from "../EdificioList/EdificioList";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const EdificioListContainer = ({ greeting }) => {
  const [listaEdificios, setListaEdificios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios`, {
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
        setListaEdificios(data);
        setMensaje(null);
      }
    } catch (err) {
      console.error("Error al obtener edificios:", err);
      setMensaje("Error al obtener los edificios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      <h1 className="greeting">{greeting}</h1>

      <button className="button btnPrimary" onClick={() => navigate(`/addEdificio`)}>
        <span className="btnText">Agregar edificio</span>
      </button>

      {!mensaje ? (
        <div>
          {loading ? (
            <p>cargando...</p>
          ) : (
            <EdificioList listaEdificios={listaEdificios} />
          )}
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigate(`/`)}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};
