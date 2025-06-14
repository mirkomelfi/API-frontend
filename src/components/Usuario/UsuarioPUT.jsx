import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const UsuarioPut = ({ fromPerfil }) => {
  const { dni } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();

  const navigate = useNavigate();
  const { tokenState, rol, clearAuthData } = useUser();

  const navigateTo = (url) => navigate(url);

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);

    // Si los campos están vacíos, enviamos null (según backend)
    if (cliente.nombre === "") cliente.nombre = null;
    if (cliente.apellido === "") cliente.apellido = null;
    if (cliente.username === "") cliente.username = null;
    if (cliente.password === "") cliente.password = null;

    if (!cliente.nombre && !cliente.apellido && !cliente.username && !cliente.password) {
      setMensaje("No se ingresaron valores para actualizar");
      return;
    }

    const url = dni
      ? `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`
      : `${process.env.REACT_APP_DOMINIO_BACK}/cambiarPerfil`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        // Si es admin, solo mensaje. Si es user, cerrar sesión
        if (!dni && rol === "ROL_USER") {
          clearAuthData();
          navigate("/login");
        } else {
          setMensaje("No posee los permisos necesarios");
        }
        return;
      }

      const data = await response.json();

      if (fromPerfil && rol === "ROL_USER" && cliente.username !== null) {
        alert("Se modificó el username. Debe volver a iniciar sesión.");
        clearAuthData();
        navigate("/login");
        return;
      }

      if (data.msj) {
        setMensaje(data.msj);
      }

      e.target.reset();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cambio en los datos del Usuario</h2>
          <h3>Ingrese solo los campos que desea modificar</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input type="text" className="form-control" name="apellido" />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" />
            </div>

            <button type="submit" className="button btnPrimary">Actualizar</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigateTo(dni ? `/usuarios/${dni}` : `/`)}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
