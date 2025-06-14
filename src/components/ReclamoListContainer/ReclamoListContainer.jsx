import React, { useState, useEffect } from "react";
import { ReclamoList } from "../ReclamoList/ReclamoList";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const ReclamoListContainer = ({ greeting }) => {
  const [listaReclamos, setListaReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const [estado, setEstado] = useState(0);
  const navigate = useNavigate();
  const { tokenState } = useUser();

  const options = [
    { value: 0, text: "Mostrar todos" },
    { value: 1, text: "Nuevo" },
    { value: 2, text: "Abierto" },
    { value: 3, text: "En proceso" },
    { value: 4, text: "Anulado" },
    { value: 5, text: "Desestimado" },
    { value: 6, text: "Terminado" },
  ];

  const handleChange = (event) => {
    setEstado(Number(event.target.value));
  };

  const ejecutarFetch = async () => {
    const url =
      estado !== 0
        ? `${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/filter?estado=${estado}`
        : `${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();

      if (data.msj) {
        setMensaje(data.msj);
      } else if (data.length === 0) {
        setMensaje("No hay reclamos con dicho estado");
        setListaReclamos([]);
      } else {
        setListaReclamos(data);
        setMensaje(null);
      }
    } catch (error) {
      console.error("Error al obtener reclamos:", error);
      setMensaje("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, [estado, tokenState]);

  return (
    <>
      <h1 className="greeting">{greeting}</h1>

      <div>
        <select value={estado} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      {!mensaje ? (
        <div>{loading ? <p>Cargando...</p> : <ReclamoList listaReclamos={listaReclamos} />}</div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigate("/")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};
