import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoEstado } from "./ReclamoEstado";
import { Medidas } from "../Medidas/Medidas";
import { useUser } from "../../context/UserContext";

const Reclamo = ({ fromPerfil }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, rol } = useUser();

  const [reclamo, setReclamo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [estado, setEstado] = useState(null);
  const [medidas, setMedidas] = useState(false);
  const [vistaMedidas, setVistaMedidas] = useState(false);

  const navigateTo = (url) => {
    navigate(url);
  };

  const cambiarEstado = () => {
    setEstado(true);
  };

  const cambiarVistaMedidas = () => {
    setVistaMedidas(true);
  };

  const eliminar = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      setMensaje(data?.msj || "No posee los permisos necesarios");
      return;
    }

    const data = await response.json();
    if (data.msj) setMensaje(data.msj);
  };

  const ejecutarFetch = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      setMensaje(data?.msj || "Error al obtener el reclamo");
      return;
    }

    const data = await response.json();
    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setReclamo(data);
      if (data.medidas?.length > 0) setMedidas(true);
    }
  };

  useEffect(() => {
    ejecutarFetch()
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      {!mensaje ? (
        !estado ? (
          !vistaMedidas ? (
            <div className="tarjetaProducto">
              <div>
                <h1>Reclamo N°{reclamo.id}</h1>
                <h3>Id del Edificio: {reclamo.idEdificio}</h3>
                <h2>Reclamable</h2>
                <h3>Tipo de reclamable: {reclamo.tipoReclamable}</h3>
                <h3>Id del Reclamable: {reclamo.idReclamable}</h3>
                <h2>DNI del usuario: {reclamo.dniUsuario}</h2>
                <h2>Fecha de inicio: {reclamo.fechaDeInicio}</h2>
                <h2>Descripción: {reclamo.descripcion}</h2>
                <h2>Estado: {reclamo.estado}</h2>
                {!medidas && <h2>Aún no hay medidas tomadas</h2>}
                {!fromPerfil && (
                  <div className="button-card">
                    <button className="button btnPrimary" onClick={() => navigateTo(`/updateReclamo/${id}`)}>
                      <span className="btnText">Modificar</span>
                    </button>
                    <button onClick={eliminar} className="button btnPrimary">
                      <span className="btnText">Eliminar</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="button-view">
                {medidas && (
                  <button onClick={cambiarVistaMedidas} className="button btnPrimary">
                    <span className="btnText">Ver Medidas</span>
                  </button>
                )}

                {fromPerfil ? (
                  <button className="button btnPrimary" onClick={() => navigateTo(`/addImage/${id}`)}>
                    <span className="btnText">Agregar imagen</span>
                  </button>
                ) : (
                  <button onClick={cambiarEstado} className="button btnPrimary">
                    <span className="btnText">Cambiar estado</span>
                  </button>
                )}

                <button className="button btnPrimary" onClick={() => navigateTo(`/verImagenes/${id}`)}>
                  <span className="btnText">Ver imágenes</span>
                </button>

                {reclamo.tipoReclamable === "Unidad" ? (
                  <button className="button btnPrimary" onClick={() => navigateTo(`/verReclamable/${reclamo.id}/unidad/${reclamo.idReclamable}`)}>
                    <span className="btnText">Ver reclamable</span>
                  </button>
                ) : (
                  <button className="button btnPrimary" onClick={() => navigateTo(`/verReclamable/${reclamo.id}/area/${reclamo.idReclamable}`)}>
                    <span className="btnText">Ver reclamable</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Medidas medidas={reclamo.medidas} />
          )
        ) : (
          <ReclamoEstado />
        )
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigateTo(rol === "ROL_USER" ? `/usuario/reclamos` : `/reclamos`)}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export { Reclamo };
