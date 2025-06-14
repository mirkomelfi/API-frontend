import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const UnidadResponsable = ({ responsable }) => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const datForm = useRef();

  const { tokenState } = useUser();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const unidad = Object.fromEntries(datosFormulario);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/unidades/${id}/${responsable}/${unidad.dni}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
        }
      );

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }

      e.target.reset();
    } catch (error) {
      console.error("Error al actualizar responsable:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cambio en el responsable de la Unidad</h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                DNI del nuevo responsable
              </label>
              <input type="number" className="form-control" name="dni" required />
            </div>
            <button type="submit" className="btn btn-primary">Actualizar</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </div>
  );
};
