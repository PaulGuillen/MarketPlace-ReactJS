import "../../../../../styles/auth/client/Register.css";

const Register = () => {
  return (
    <div className="register-main-container">
      <div className="register-container">
        <h2>Crear cuenta</h2>
        <p>¿Eres nuevo en Ripley?</p>
        <form>
          <label>
            <input type="text" placeholder="Nombre*" />
          </label>
          <label>
            <input type="text" placeholder="Apellido*" />
          </label>
          <label>
            <input type="text" placeholder="DNI*" />
          </label>
          <label>
            <input type="tel" placeholder="Teléfono" />
          </label>
          <label>
            <input type="email" placeholder="Correo*" />
          </label>
          <label>
            <input type="password" placeholder="Crea tu contraseña*" />
          </label>
          <div className="checkbox-container">
            <input type="checkbox" />
            <span className="checkbox-label">
              Autorizo los <a href="#">fines adicionales</a> de tratamiento de mis datos
            </span>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" />
            <span className="checkbox-label">
              He leído y acepto los <a href="#">términos y condiciones</a> y <a href="#">política de privacidad</a>
            </span>
          </div>
          <button type="submit">Crear cuenta</button>
        </form>
        <p className="privacy-links"><a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
};

export default Register;
