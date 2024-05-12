import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

function Navbar() {
  const { isAuthenticated, logOut } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className={isFixed ? 'navBarFixed' : 'navBar'}>

        <div className="logoNdesc">
          <h1>GOMPA</h1>

          <p>
            GESTION DE OPERACIONES DE MERCANCIAS PELIGROSAS EN LA AVIACION
            MILITAR
          </p>

          </div>

        <div className="anclasNavbar">
          {isMobile && (
            <div className="mobileMenuButton" onClick={toggleMenu}>
              <span>&#9776;</span>
            </div>
          )}

          {/* Si estamos en un dispositivo móvil y el menú está abierto, mostramos el menú desplegable */}
          {isMobile && (
            <div
              className={`shadowMobileMenu ${isMenuOpen ? "show" : ""}`}
              onClick={toggleMenu}
            >
              <div className={`mobileMenu ${isMenuOpen ? "show" : ""}`}>
                <div className="mobileCloseMenu">
                  <span className="closeMenuButton" onClick={toggleMenu}>
                    &times;
                  </span>
                </div>
                {!isAuthenticated ? (
                  <>
                    <Link to="/" onClick={closeMenu}>
                      Login
                    </Link>
                    <Link to="/register" onClick={closeMenu}>
                      Registrarse
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/misDatos" onClick={closeMenu}>
                      Mis datos
                    </Link>
                    <Link to="/operacion" onClick={closeMenu}>
                      Operacion
                    </Link>
                    <Link to="/asistencia" onClick={closeMenu}>
                      Asistencia
                    </Link>
                    <div className="cerrarSesionButton">
                      <button
                        onClick={() => {
                          logOut();
                          closeMenu();
                        }}
                      >
                        Cerrar Sesión 🚪
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {!isMobile && !isMenuOpen ? (
            <div className="desktopMenu">
              {!isAuthenticated ? (
                <>
                  <Link to="/">Login</Link>
                  <Link to="/register">Registrarse</Link>
                </>
              ) : (
                <>
                  <Link to="/misDatos">Mis datos</Link>
                  <Link to="/operacion">Operacion</Link>
                  <Link to="/asistencia">Asistencia</Link>
                  <button onClick={logOut}>Cerrar Sesión</button>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}



export default Navbar;
