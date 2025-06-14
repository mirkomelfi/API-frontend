import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const ReclamoPut = () => {
  const { id } = useParams();
  const { token, rol } = useUser();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();

  const navigateTo = (url) => {
    navigate(url);
  };

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const reclamo = Object.fromEntries(datosFormulario);

    if (reclamo.descripcion === "") reclamo.descripcion = null;

    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reclamo),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      setMensaje(data?.msj || "No posee los permisos necesarios");
      return;
    }

    const data = await response.json();
    if (data.msj) {
      setMensaje(data.msj);
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cambio en los datos del Reclamo</h2>
          <h3>Ingrese solo los campos que desea modificar</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                required
              />
            </div>

            <button type="submit" className="button btnPrimary">
              Actualizar
            </button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button
        className="button btnPrimary"
        onClick={() => navigateTo(`/reclamos/${id}`)}
      >
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
