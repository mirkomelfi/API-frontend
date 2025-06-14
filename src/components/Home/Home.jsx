import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const Home = () => {
  const navigate = useNavigate();
  const { rol } = useUser();
  const isUser = rol === "ROL_USER";

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div className="home">
      {isUser ? (
        <>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`usuario/reclamos`)}>
            <span className="btnText">Mis Reclamos</span>
          </button>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`usuario/unidades`)}>
            <span className="btnText">Mis unidades</span>
          </button>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`usuario/areas`)}>
            <span className="btnText">Mis áreas</span>
          </button>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`usuario/current`)}>
            <span className="btnText">Mi perfil</span>
          </button>
        </>
      ) : (
        <>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`reclamos`)}>
            <span className="btnText">Reclamos</span>
          </button>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`edificios`)}>
            <span className="btnText">Edificios</span>
          </button>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`usuarios`)}>
            <span className="btnText">Usuarios</span>
          </button>
          <button className="button button-home btnPrimary" onClick={() => navigateTo(`usuario/current`)}>
            <span className="btnText">Mi perfil</span>
          </button>
        </>
      )}
    </div>
  );
};
