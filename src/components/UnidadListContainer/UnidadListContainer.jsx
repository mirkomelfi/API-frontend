import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UnidadList } from "../UnidadList/UnidadList";
import { UnidadPost } from "../Unidad/UnidadPOST";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const UnidadListContainer = ({ greeting }) => {
  const { id } = useParams();
  const [listaUnidades, setListaUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState } = useUser();

  const agregar = () => {
    setAdd(true);
  };

  useEffect(() => {
    const ejecutarFetch = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/edificios/${id}`, {
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
          const unidades = data.unidades;
          if (unidades.length === 0) {
            setMensaje("No se encontraron unidades para este edificio");
          } else {
            setListaUnidades(unidades);
          }
        }
      } catch (error) {
        console.error("Error al cargar unidades:", error);
        setMensaje("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    ejecutarFetch();
  }, [id, tokenState]);

  return (
    <>
      {!add ? (
        <>
          <h1 className="greeting">{greeting}</h1>
          <button onClick={agregar} className="button btnPrimary">
            <span className="btnText">Agregar Unidad</span>
          </button>
          {!mensaje ? (
            <div>
              {loading ? (
                <p>cargando...</p>
              ) : (
                <UnidadList pid={id} listaUnidades={listaUnidades} isAdmin={true} />
              )}
            </div>
          ) : (
            <Mensaje msj={mensaje} />
          )}
        </>
      ) : (
        <UnidadPost />
      )}

      <button className="button btnPrimary" onClick={() => navigate("/edificios")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export default UnidadListContainer;
