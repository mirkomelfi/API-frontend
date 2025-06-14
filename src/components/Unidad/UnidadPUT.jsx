import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const UnidadPut = () => {
  const { id } = useParams();
  const { state } = useLocation(); // viene el ID del edificio
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const datForm = useRef();

  const { tokenState } = useUser();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const unidad = Object.fromEntries(datosFormulario);

    if (unidad.numero === "") unidad.numero = null;
    if (unidad.piso === "") unidad.piso = null;

    if (!unidad.piso && !unidad.numero) {
      setMensaje("No se ingresaron valores para actualizar");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/unidades/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(unidad),
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }

      e.target.reset();
    } catch (error) {
      console.error("Error al actualizar unidad:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cambio en los datos de la Unidad</h2>
          <h3>Ingrese solo los campos que desea modificar</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input type="number" className="form-control" name="numero" />
            </div>
            <div className="mb-3">
              <label htmlFor="piso" className="form-label">Piso</label>
              <input type="number" className="form-control" name="piso" />
            </div>
            <button type="submit" className="button btnPrimary">Actualizar</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigate(`/edificios/${state}/unidades/${id}`)}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
