import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const Imagen = () => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [bytes, setBytes] = useState(null);
  const [num, setNum] = useState(1);
  const navigate = useNavigate();

  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const siguienteImg = () => {
    setNum((prev) => prev + 1);
  };

  const anteriorImg = () => {
    setNum((prev) => prev - 1);
  };

  const eliminarImg = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setMensaje(data?.msj || "Error al eliminar la imagen");
        return;
      }

      const data = await response.json();
      if (data.msj) setMensaje(data.msj);
    } catch (error) {
      setMensaje("Error al eliminar la imagen");
      console.error(error);
    }
  };

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setBytes(data.datosImagen);
      }
    } catch (error) {
      setMensaje("Error al cargar la imagen");
      console.error(error);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, [num]);

  return (
    <>
      {!mensaje ? (
        <>
          <div>
            <div className="tarjetaListado">
              <h1>Imagen N°{num}</h1>
              {bytes && <img src={`data:image/jpeg;base64,${bytes}`} alt="imagen" />}
              <button onClick={eliminarImg} className="button btnPrimary">
                <span className="btnText">Eliminar imagen</span>
              </button>
            </div>
          </div>
          <div className="contenedorBotones-img">
            {num !== 1 && (
              <button onClick={anteriorImg} className="button btnPrimary">
                <span className="btnText">Anterior imagen</span>
              </button>
            )}
            <button onClick={siguienteImg} className="button btnPrimary">
              <span className="btnText">Siguiente imagen</span>
            </button>
          </div>
        </>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button
        className="button btnPrimary"
        onClick={() =>
          navigate(isAdmin ? `/reclamos/${id}` : `/usuario/reclamos/${id}`)
        }
      >
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export { Imagen };
