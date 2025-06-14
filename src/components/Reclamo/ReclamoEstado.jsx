import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const ReclamoEstado = () => {
  const { id } = useParams();
  const { token, rol } = useUser();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();

  const options = [
    { value: 1, text: 'Nuevo' },
    { value: 2, text: 'Abierto' },
    { value: 3, text: 'En proceso' },
    { value: 4, text: 'Anulado' },
    { value: 5, text: 'Desestimado' },
    { value: 6, text: 'Terminado' }
  ];

  const [estado, setEstado] = useState(options[0].value);

  const handleChange = (event) => {
    setEstado(event.target.value);
  };

  const consultarForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(datForm.current);
    const { medida } = Object.fromEntries(formData);

    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/${id}/estado/${estado}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ medida }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      setMensaje(data?.msj || "No posee los permisos necesarios");
      return;
    }

    const data = await response.json();
    if (data.msj) setMensaje(data.msj);

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h1>Cambio en el estado del Reclamo</h1>
          <div>
            <h3>Seleccione el nuevo estado del reclamo</h3>
            <select value={estado} onChange={handleChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="medida" className="form-label">
                Medida tomada
              </label>
              <input
                type="text"
                className="form-control"
                name="medida"
                required
              />
            </div>

            <button type="submit" className="button btnPrimary">
              Actualizar
            </button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </div>
  );
};
