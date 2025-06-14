import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const ReclamoPost = ({ isUnit }) => {
  const { id } = useParams();
  const { token, rol } = useUser();
  const navigate = useNavigate();
  const datForm = useRef();
  const [mensaje, setMensaje] = useState(null);

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const reclamo = Object.fromEntries(datosFormulario);

    if (reclamo.descripcion === "") reclamo.descripcion = null;

    const url = isUnit
      ? `${process.env.REACT_APP_DOMINIO_BACK}/unidades/${id}/addReclamo`
      : `${process.env.REACT_APP_DOMINIO_BACK}/areas/${id}/addReclamo`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reclamo),
    });

    if (!response.ok) {
      const data = await response.json();
      setMensaje(data?.msj || "No posee los permisos necesarios");
      return;
    }

    const data = await response.json();
    if (data.msj) setMensaje(data.msj);

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Creación de Reclamo</h2>
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
              Crear
            </button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </div>
  );
};
