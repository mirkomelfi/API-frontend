import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const EdificioPut = () => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";
  const datForm = useRef();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const edificio = Object.fromEntries(datosFormulario);

    // Campos vacíos se transforman en null
    if (edificio.calle === "") edificio.calle = null;
    if (edificio.ciudad === "") edificio.ciudad = null;
    if (edificio.numero === "") edificio.numero = null;
    if (edificio.codigoPostal === "") edificio.codigoPostal = null;

    if (!edificio.calle && !edificio.ciudad && !edificio.numero && !edificio.codigoPostal) {
      setMensaje("No se ingresaron valores para actualizar");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`,
        },
        body: JSON.stringify(edificio),
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    } catch (error) {
      console.error("Error al actualizar edificio:", error);
      setMensaje("Error al actualizar edificio.");
    }

    e.target.reset();
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cambio en los datos del Edificio</h2>
          <h3>Ingrese solo los campos que desea modificar</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="calle" className="form-label">Calle</label>
              <input type="text" className="form-control" name="calle" />
            </div>
            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input type="number" className="form-control" name="numero" />
            </div>
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">Ciudad</label>
              <input type="text" className="form-control" name="ciudad" />
            </div>
            <div className="mb-3">
              <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
              <input type="number" className="form-control" name="codigoPostal" />
            </div>

            <button type="submit" className="button btnPrimary">Actualizar</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigateTo(`/edificios`)}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
