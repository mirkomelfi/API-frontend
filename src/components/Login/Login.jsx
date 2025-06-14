import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const Login = () => {
  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();
  const navigate = useNavigate();
  const { setAuthData } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(datForm.current);
    const { username, password } = Object.fromEntries(formData);

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const perfilRes = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (perfilRes.ok) {
          const userData = await perfilRes.json();
          setAuthData(data.token, userData);
          navigate("/");
        } else {
          setMensaje("Error al cargar perfil de usuario");
        }
      } else {
        setMensaje(data.msj || "Credenciales incorrectas");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h3>Formulario de Inicio de Sesión</h3>
          <form onSubmit={handleSubmit} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control" name="username" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="password" required />
            </div>
            <button type="submit" className="button btnPrimary">
              <span className="btnText">Iniciar Sesión</span>
            </button>
          </form>
        </div>
      ) : (
        <>
          <Mensaje msj={mensaje} />
          <button className="button btnPrimary" onClick={() => navigate("/login")}>
            <span className="btnText">Volver a Login</span>
          </button>
        </>
      )}
    </div>
  );
};
