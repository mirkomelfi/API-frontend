import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const UnidadPost = () => {
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
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios/${id}/addUnit`, {
        method: "POST",
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

      e.target.reset(); // Limpia el formulario
    } catch (error) {
      console.error("Error al crear unidad:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Creación de Unidad</h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="piso" className="form-label">Piso</label>
              <input type="number" className="form-control" name="piso" required />
            </div>
            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input type="number" className="form-control" name="numero" required />
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </div>
  );
};
