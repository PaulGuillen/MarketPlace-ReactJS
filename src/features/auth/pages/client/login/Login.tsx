import "../../../../../styles/auth/client/Login.css";

export const Login = () => {
    return (
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <p>¡Bienvenido a Ripley.com!</p>
          <form>
            <label>
              Correo o DNI
              <input type="text" placeholder="Correo o DNI*" />
            </label>
            <label>
              Contraseña
              <input type="password" placeholder="Contraseña*" />
            </label>
            <button type="submit">Iniciar sesión</button>
            <button type="button">Iniciar sesión con Google</button>
            <button type="button">Iniciar sesión con Apple</button>
          </form>
          <p>¿Eres nuevo en Ripley.com? <a href="/signUpClient">Crear cuenta</a></p>
        </div>
      );
};

export default Login;