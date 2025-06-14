import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const Register = () => {
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const datForm = useRef();

  const { tokenState } = useUser();

  const navigateTo = (url) => navigate(url);

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);

    if (!cliente.username || !cliente.password) {
      setMensaje("Faltan datos");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(cliente),
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }

      e.target.reset();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h3>Formulario de registro</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" required />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input type="text" className="form-control" name="apellido" required />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control" name="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">DNI</label>
              <input type="number" className="form-control" name="dni" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="password" />
            </div>

            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigateTo(`/usuarios`)}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
