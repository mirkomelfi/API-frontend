import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const ImagenPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const datForm = useRef();

  const [mensaje, setMensaje] = useState(null);
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const navigateTo = (url) => navigate(url);

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const imagen = Object.fromEntries(datosFormulario);

    const img = new FormData();
    img.append("archivo", imagen.imagen);

    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${tokenState}`,
      },
      body: img,
    });

    const data = await response.json();
    if (data.msj) {
      setMensaje(data.msj);
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cargado de Imagen</h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">Imagen</label>
              <input type="file" className="form-control" name="imagen" required />
            </div>
            <button type="submit" className="button btnPrimary">Crear</button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      {isAdmin ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/usuario/reclamos/${id}`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : (
        <button className="button btnPrimary" onClick={() => navigateTo(`/reclamos`)}>
          <span className="btnText">Volver</span>
        </button>
      )}
    </div>
  );
};

export default ImagenPost;
