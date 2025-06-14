import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { UnidadResponsable } from "./UnidadResponsable";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";
import { useUser } from "../../context/UserContext";

const Unidad = ({ fromReclamo, fromPerfil }) => {
  const { idRec, id } = useParams();
  const [unidad, setUnidad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [updateResponsable, setUpdateResponsable] = useState(null);
  const [add, setAdd] = useState(null);

  const navigate = useNavigate();
  const { tokenState, rol } = useUser();

  const navigateTo = (url) => {
    navigate(url, { state: unidad.idEdificio });
  };

  const cambiarPropietario = () => setUpdateResponsable("propietario");
  const cambiarInquilino = () => setUpdateResponsable("inquilino");
  const generarReclamo = () => setAdd(true);

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/unidades/${id}`, {
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
        setUnidad(data);
      }
    } catch (error) {
      console.error("Error al obtener unidad:", error);
      setMensaje("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/unidades/${id}`, {
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
    } catch (error) {
      console.error("Error al eliminar unidad:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, [tokenState]);

  // ---------- RENDER ----------
  if (mensaje) return <Mensaje msj={mensaje} />;

  if (add) return <ReclamoPost isUnit={true} />;

  if (updateResponsable) return <UnidadResponsable responsable={updateResponsable} />;

  return (
    <>
      <div className="tarjetaProducto">
        <div>
          <h1>Unidad N°{unidad.id}</h1>
          <h2>Nombre: {unidad.nombre}</h2>
          <h2>Piso: {unidad.piso}</h2>
          <h2>Numero: {unidad.numero}</h2>
          <h2>Estado: {unidad.estado}</h2>

          {unidad.propietario && (
            <>
              <h2>Propietario:</h2>
              <h3>DNI: {unidad.propietario.dni}</h3>
              <h3>Nombre: {unidad.propietario.nombre}</h3>
              <h3>Apellido: {unidad.propietario.apellido}</h3>
            </>
          )}

          {unidad.inquilino && (
            <>
              <h2>Inquilino:</h2>
              <h3>DNI: {unidad.inquilino.dni}</h3>
              <h3>Nombre: {unidad.inquilino.nombre}</h3>
              <h3>Apellido: {unidad.inquilino.apellido}</h3>
            </>
          )}
        </div>

        {!fromReclamo && (
          <div className="button-view">
            {fromPerfil || rol === "ROL_USER" ? (
              <button onClick={generarReclamo} className="button btnPrimary">
                <span className="btnText">Generar reclamo</span>
              </button>
            ) : (
              <div>
                <button onClick={() => navigateTo(`/updateUnidad/${id}`)} className="button btnPrimary">
                  <span className="btnText">Modificar</span>
                </button>
                <button onClick={cambiarPropietario} className="button btnPrimary">
                  <span className="btnText">Cambiar propietario</span>
                </button>
                <button onClick={cambiarInquilino} className="button btnPrimary">
                  <span className="btnText">Cambiar inquilino</span>
                </button>
                <button onClick={eliminar} className="button btnPrimary">
                  <span className="btnText">Eliminar</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOTÓN VOLVER */}
      {fromPerfil ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/usuario/unidades`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : !fromReclamo ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/edificios/${unidad.idEdificio}/unidades`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : rol === "ROL_USER" ? (
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

export { Unidad };
