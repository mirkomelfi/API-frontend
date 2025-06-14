import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const Edificio = ({ edificio }) => {
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const navigateTo = (url) => {
    navigate(url);
  };

  const eliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios/${edificio.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    } catch (err) {
      setMensaje("Error al eliminar el edificio.");
      console.error("Error:", err);
    }
  };

  return (
    <>
      {!mensaje ? (
        <div className="tarjetaProducto">
          <div>
            <h1>Edificio N°{edificio.id}</h1>
            <h2>Calle: {edificio.calle}</h2>
            <h2>Numero: {edificio.numero}</h2>
            <h2>Ciudad: {edificio.ciudad}</h2>
            <h2>Codigo postal: {edificio.codigoPostal}</h2>
          </div>

          <div className="button-view">
            <button className="button btnPrimary" onClick={() => navigateTo(`${edificio.id}/unidades`)}>
              <span className="btnText">Ver unidades</span>
            </button>
            <button className="button btnPrimary" onClick={() => navigateTo(`${edificio.id}/areas`)}>
              <span className="btnText">Ver áreas</span>
            </button>
            {isAdmin && (
              <>
                <button className="button btnPrimary" onClick={() => navigateTo(`/updateEdificio/${edificio.id}`)}>
                  <span className="btnText">Modificar</span>
                </button>
                <button className="button btnPrimary" onClick={eliminar}>
                  <span className="btnText">Eliminar</span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </>
  );
};

export { Edificio };
