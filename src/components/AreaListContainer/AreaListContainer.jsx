import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AreaList } from "../AreaList/AreaList";
import { AreaPost } from "../Area/AreaPOST";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const AreaListContainer = ({ greeting }) => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [listaAreas, setListaAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const navigate = useNavigate();

  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const navigateTo = (url) => {
    navigate(url);
  };

  const agregar = () => {
    setAdd(true);
  };

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/edificios/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();

      if (data.msj) {
        setMensaje(data.msj);
      } else {
        const areas = data.areasComunes;
        if (areas.length === 0) {
          setMensaje("No se encontraron áreas comunes para este edificio");
        } else {
          setListaAreas(areas);
        }
      }
    } catch (error) {
      console.error("Error al obtener áreas comunes:", error);
      setMensaje("Ocurrió un error al cargar las áreas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      {!add ? (
        <>
          <h1 className="greeting">{greeting}</h1>
          <button onClick={agregar} className="button btnPrimary">
            <span className="btnText">Agregar Área Común</span>
          </button>
          {!mensaje ? (
            <div>
              {loading ? <p>Cargando...</p> : <AreaList pid={id} listaAreas={listaAreas} isAdmin={isAdmin} />}
            </div>
          ) : (
            <Mensaje msj={mensaje} />
          )}
        </>
      ) : (
        <AreaPost />
      )}
      <button className="button btnPrimary" onClick={() => navigateTo(`/edificios`)}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export default AreaListContainer;
