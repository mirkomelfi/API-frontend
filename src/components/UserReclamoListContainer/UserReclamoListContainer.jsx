import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReclamoList } from "../ReclamoList/ReclamoList";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const UserReclamoListContainer = ({ greeting }) => {
  const [listaReclamos, setListaReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [estado, setEstado] = useState(0);

  const { tokenState } = useUser();
  const navigate = useNavigate();

  const options = [
    { value: 0, text: 'Mostrar todos' },
    { value: 1, text: 'Nuevo' },
    { value: 2, text: 'Abierto' },
    { value: 3, text: 'En proceso' },
    { value: 4, text: 'Anulado' },
    { value: 5, text: 'Desestimado' },
    { value: 6, text: 'Terminado' }
  ];

  const handleChange = (event) => {
    setEstado(Number(event.target.value));
  };

  useEffect(() => {
    const ejecutarFetch = async () => {
      setLoading(true);
      const url =
        estado !== 0
          ? `${process.env.REACT_APP_DOMINIO_BACK}/misReclamos/filter?estado=${estado}`
          : `${process.env.REACT_APP_DOMINIO_BACK}/misReclamos`;

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
        } else {
          setListaReclamos(data);
        }
      } catch (error) {
        console.error("Error al cargar reclamos:", error);
        setMensaje("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    ejecutarFetch();
  }, [estado, tokenState]);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : !mensaje ? (
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
          <ReclamoList listaReclamos={listaReclamos} />
        </>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button className="button btnPrimary" onClick={() => navigate("/")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export default UserReclamoListContainer;
