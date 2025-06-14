import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";
import { useUser } from "../../context/UserContext";

const Area = ({ fromReclamo, fromPerfil }) => {
  const { idRec, id } = useParams();
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const navigateTo = (url) => {
    navigate(url, { state: area?.idEdificio });
  };

  const generarReclamo = () => {
    setShowForm(true);
  };

  const eliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/areas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    } catch (err) {
      setMensaje("Ocurrió un error al intentar eliminar el área.");
    }
  };

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/areas/${id}`, {
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
        setArea(data);
      }
    } catch (err) {
      console.error("Error al obtener área:", err);
      setMensaje("Error al obtener datos del área.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  if (loading) return <p>Cargando área...</p>;

  return (
    <>
      {!showForm ? (
        !mensaje ? (
          <div className="tarjetaProducto">
            <div>
              <h1>Área N°{area?.id}</h1>
              <h2>Nombre: {area?.nombre}</h2>
              <h2>Piso: {area?.piso}</h2>
              <h2>Descripción: {area?.descripcion}</h2>
            </div>

            {!fromReclamo && (
              <div className="button-view">
                {fromPerfil || isAdmin ? (
                  <button onClick={generarReclamo} className="button btnPrimary">
                    <span className="btnText">Generar reclamo</span>
                  </button>
                ) : (
                  <div>
                    <button
                      className="button btnPrimary"
                      onClick={() => navigateTo(`/updateArea/${id}`)}
                    >
                      <span className="btnText">Modificar</span>
                    </button>
                    <button onClick={eliminar} className="button btnPrimary">
                      <span className="btnText">Eliminar</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <Mensaje msj={mensaje} />
        )
      ) : (
        <ReclamoPost isUnit={false} />
      )}

      {fromPerfil ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/usuario/areas`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : !fromReclamo ? (
        <button
          className="button btnPrimary"
          onClick={() => navigateTo(`/edificios/${area?.idEdificio}/areas`)}
        >
          <span className="btnText">Volver</span>
        </button>
      ) : isAdmin ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/usuario/reclamos/${idRec}`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : (
        <button className="button btnPrimary" onClick={() => navigateTo(`/reclamos/${idRec}`)}>
          <span className="btnText">Volver</span>
        </button>
      )}
    </>
  );
};

export { Area };
