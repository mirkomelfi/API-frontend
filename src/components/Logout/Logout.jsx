import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const Logout = () => {
  const { clearAuthData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthData();
  }, []);

  return (
    <div className="tarjetaListado">
      <Mensaje msj="Sesión cerrada con éxito" />
      <button className="button btnPrimary" onClick={() => navigate("/login")}>
        <span className="btnText">Volver al Login</span>
      </button>
    </div>
  );
};
