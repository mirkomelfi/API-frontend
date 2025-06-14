import { useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const AreaPut = () => {
  const { id } = useParams();
  const { state } = useLocation(); // viene el id del edificio
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";
  const datForm = useRef();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const area = Object.fromEntries(datosFormulario);

    // Reemplazo de campos vacíos por null
    for (const key in area) {
      if (area[key] === "") area[key] = null;
    }

    // Validación simple
    if (!area.nombre && !area.piso && !area.descripcion) {
      setMensaje("No se ingresaron valores para actualizar");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/areas/${id}`,
        {
          method: "PUT",
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
    } catch (error) {
      setMensaje("Error al intentar actualizar el área");
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cambio en los datos del Área</h2>
          <h3>Ingrese solo los campos que desea modificar</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" />
            </div>
            <div className="mb-3">
              <label htmlFor="piso" className="form-label">Piso</label>
              <input type="number" className="form-control" name="piso" />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <input type="text" className="form-control" name="descripcion" />
            </div>
            <button type="submit" className="button btnPrimary">Actualizar</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button
        className="button btnPrimary"
        onClick={() => navigate(`/edificios/${state}/areas/${id}`)}
      >
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
