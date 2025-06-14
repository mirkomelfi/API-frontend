import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const Usuario = ({ fromPerfil }) => {
  const { dni } = useParams();
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState, rol, clearAuthData } = useUser();

  const ejecutarFetch = async () => {
    const url = dni
      ? `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`
      : `${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      if (!response.ok) {
        if (!dni) {
          // En modo perfil, si falla, cerrar sesión
          clearAuthData();
          navigate("/login");
        } else {
          setMensaje("No posee los permisos necesarios");
        }
        return;
      }

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setUsuario(data);
      }
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      setMensaje("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
        }
      );

      if (!response.ok) {
        setMensaje("No posee los permisos necesarios");
        return;
      }

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        navigate("/usuarios");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  const navigateTo = (url) => navigate(url);

  useEffect(() => {
    ejecutarFetch();
  }, [tokenState, dni]);

  return (
    <>
      {!mensaje ? (
        <div className="tarjetaProducto">
          <div>
            <h1>DNI: {usuario.dni}</h1>
            <h2>Username: {usuario.username}</h2>
            <h2>Nombre: {usuario.nombre}</h2>
            <h2>Apellido: {usuario.apellido}</h2>
          </div>
          <div className="button-view">
            <button
              className="button btnPrimary"
              onClick={() =>
                navigateTo(dni ? `/updateUsuario/${dni}` : `/updateUsuario`)
              }
            >
              <span className="btnText">Modificar</span>
            </button>
            {dni && (
              <button className="button btnPrimary" onClick={eliminar}>
                <span className="btnText">Eliminar</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button
        className="button btnPrimary"
        onClick={() => navigateTo(dni ? `/usuarios` : `/`)}
      >
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export { Usuario };
