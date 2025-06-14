import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const AreaPost = () => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";
  const datForm = useRef();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const area = Object.fromEntries(datosFormulario);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios/${id}/addArea`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify(area),
        }
      );

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    } catch (err) {
      setMensaje("Error al enviar los datos. Intente nuevamente.");
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Creación de Área Común</h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input type="text" className="form-control" name="nombre" required />
            </div>
            <div className="mb-3">
              <label htmlFor="piso" className="form-label">
                Piso
              </label>
              <input type="number" className="form-control" name="piso" required />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input type="text" className="form-control" name="descripcion" required />
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
