import { useRef, useState } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const EdificioPost = () => {
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";
  const datForm = useRef();

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const direccion = Object.fromEntries(datosFormulario);

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`,
        },
        body: JSON.stringify(direccion),
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    } catch (err) {
      console.error("Error al crear edificio:", err);
      setMensaje("Error al crear el edificio.");
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
          <h2>Creación de Edificio</h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="calle" className="form-label">Calle</label>
              <input type="text" className="form-control" name="calle" required />
            </div>
            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input type="number" className="form-control" name="numero" required />
            </div>
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">Ciudad</label>
              <input type="text" className="form-control" name="ciudad" required />
            </div>
            <div className="mb-3">
              <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
              <input type="number" className="form-control" name="codigoPostal" required />
            </div>

            <button type="submit" className="button btnPrimary">Crear</button>
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
